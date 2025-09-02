import { PrismaClient } from '../generated/prisma';
import { PlanType, canUpgrade, canDowngrade } from '../lib/plans';

const prisma = new PrismaClient();

export class SubscriptionService {
  /**
   * Get user's current subscription status
   */
  static async getUserSubscription(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentPlan: true,
        subscriptionStatus: true,
        polarCustomerId: true,
        subscriptionStartDate: true,
        subscriptionEndDate: true,
        nextBillingDate: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      plan: user.currentPlan as PlanType,
      status: user.subscriptionStatus,
      polarCustomerId: user.polarCustomerId,
      startDate: user.subscriptionStartDate,
      endDate: user.subscriptionEndDate,
      nextBillingDate: user.nextBillingDate
    };
  }

  /**
   * Get user's subscription history
   */
  static async getSubscriptionHistory(userId: string) {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return subscriptions;
  }

  /**
   * Create a new subscription (called from Polar webhook)
   */
  static async createSubscription(data: {
    subscriptionId: string;
    userId: string;
    planType: PlanType;
    polarCustomerId: string;
    startDate: Date;
    nextBillingDate: Date;
  }) {
    const { subscriptionId, userId, planType, polarCustomerId, startDate, nextBillingDate } = data;

    // Update user's subscription info
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentPlan: planType,
        subscriptionStatus: 'active',
        polarCustomerId,
        subscriptionStartDate: startDate,
        nextBillingDate
      }
    });

    // Create subscription record
    const subscription = await prisma.subscription.create({
      data: {
        id: subscriptionId,
        userId,
        planType,
        status: 'active',
        startDate,
        nextBillingDate,
        polarCustomerId
      }
    });

    return subscription;
  }

  /**
   * Update subscription status (called from Polar webhook)
   */
  static async updateSubscriptionStatus(subscriptionId: string, status: string, nextBillingDate?: Date) {
    const subscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status,
        ...(nextBillingDate && { nextBillingDate })
      }
    });

    // Update user's subscription status
    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        subscriptionStatus: status,
        ...(nextBillingDate && { nextBillingDate })
      }
    });

    return subscription;
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true, polarCustomerId: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // If user is on free plan, just update status
    if (user.currentPlan === 'free') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: 'cancelled',
          subscriptionEndDate: new Date()
        }
      });
      return;
    }

    // For paid plans, we need to handle through Polar
    // This would typically involve calling Polar's API to cancel
    // For now, we'll just update the local status
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: 'cancelled',
        subscriptionEndDate: new Date()
      }
    });

    // Update active subscription record
    await prisma.subscription.updateMany({
      where: {
        userId,
        status: 'active'
      },
      data: {
        status: 'cancelled',
        endDate: new Date()
      }
    });
  }

  /**
   * Check if user can upgrade to a specific plan
   */
  static async canUpgradeToPlan(userId: string, targetPlan: PlanType): Promise<{
    canUpgrade: boolean;
    reason?: string;
  }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true, subscriptionStatus: true }
    });

    if (!user) {
      return { canUpgrade: false, reason: 'User not found' };
    }

    const currentPlan = user.currentPlan as PlanType;

    // Check if user is already on the target plan or higher
    if (currentPlan === targetPlan) {
      return { canUpgrade: false, reason: 'Already on this plan' };
    }

    if (!canUpgrade(currentPlan, targetPlan)) {
      return { canUpgrade: false, reason: 'Cannot upgrade to this plan' };
    }

    // Check subscription status
    if (user.subscriptionStatus === 'past_due') {
      return { canUpgrade: false, reason: 'Payment is past due' };
    }

    return { canUpgrade: true };
  }

  /**
   * Check if user can downgrade to a specific plan
   */
  static async canDowngradeToPlan(userId: string, targetPlan: PlanType): Promise<{
    canDowngrade: boolean;
    reason?: string;
  }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true, subscriptionStatus: true }
    });

    if (!user) {
      return { canDowngrade: false, reason: 'User not found' };
    }

    const currentPlan = user.currentPlan as PlanType;

    // Check if user is already on the target plan or lower
    if (currentPlan === targetPlan) {
      return { canDowngrade: false, reason: 'Already on this plan' };
    }

    if (!canDowngrade(currentPlan, targetPlan)) {
      return { canDowngrade: false, reason: 'Cannot downgrade to this plan' };
    }

    return { canDowngrade: true };
  }

  /**
   * Get subscription analytics for admin dashboard
   */
  static async getSubscriptionAnalytics() {
    // Plan distribution
    const planDistribution = await prisma.user.groupBy({
      by: ['currentPlan'],
      _count: {
        currentPlan: true
      }
    });

    // Status distribution
    const statusDistribution = await prisma.user.groupBy({
      by: ['subscriptionStatus'],
      _count: {
        subscriptionStatus: true
      }
    });

    // Monthly recurring revenue (MRR)
    const activePaidSubscriptions = await prisma.user.count({
      where: {
        subscriptionStatus: 'active',
        currentPlan: {
          in: ['basic', 'pro']
        }
      }
    });

    // Calculate MRR (simplified - in real app you'd sum actual subscription amounts)
    const basicUsers = await prisma.user.count({
      where: {
        subscriptionStatus: 'active',
        currentPlan: 'basic'
      }
    });

    const proUsers = await prisma.user.count({
      where: {
        subscriptionStatus: 'active',
        currentPlan: 'pro'
      }
    });

    const mrr = (basicUsers * 9.99) + (proUsers * 19.99);

    return {
      planDistribution: planDistribution.reduce((acc, plan) => {
        acc[plan.currentPlan] = plan._count.currentPlan;
        return acc;
      }, {} as Record<string, number>),
      statusDistribution: statusDistribution.reduce((acc, status) => {
        acc[status.subscriptionStatus] = status._count.subscriptionStatus;
        return acc;
      }, {} as Record<string, number>),
      mrr: Math.round(mrr * 100) / 100,
      activePaidSubscriptions
    };
  }

  /**
   * Get users with past due subscriptions
   */
  static async getPastDueSubscriptions() {
    return await prisma.user.findMany({
      where: {
        subscriptionStatus: 'past_due'
      },
      select: {
        id: true,
        name: true,
        email: true,
        currentPlan: true,
        nextBillingDate: true
      }
    });
  }

  /**
   * Get users whose subscriptions are expiring soon
   */
  static async getExpiringSubscriptions(days: number = 7) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    return await prisma.user.findMany({
      where: {
        subscriptionStatus: 'active',
        nextBillingDate: {
          lte: expiryDate
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        currentPlan: true,
        nextBillingDate: true
      }
    });
  }

  /**
   * Handle subscription activation from Polar webhook
   */
  static async handleSubscriptionActivated(payload: any) {
    const { subscription, customer } = payload;
    
    try {
      // Find user by Polar customer ID
      const user = await prisma.user.findFirst({
        where: { polarCustomerId: customer.id }
      });

      if (!user) {
        console.error('User not found for Polar customer:', customer.id);
        return;
      }

      // Determine plan type from subscription
      const planType = this.determinePlanTypeFromProductId(subscription.product_id);
      
      if (!planType) {
        console.error('Unknown product ID:', subscription.product_id);
        return;
      }

      // Create subscription record
      await this.createSubscription({
        subscriptionId: subscription.id,
        userId: user.id,
        planType,
        polarCustomerId: customer.id,
        startDate: new Date(subscription.created_at),
        nextBillingDate: new Date(subscription.next_billing_date)
      });

      console.log('Subscription activated:', subscription.id);
    } catch (error) {
      console.error('Error handling subscription activation:', error);
    }
  }

  /**
   * Handle subscription cancellation from Polar webhook
   */
  static async handleSubscriptionCanceled(payload: any) {
    const { subscription } = payload;
    
    try {
      // Update subscription status to cancelled
      await this.updateSubscriptionStatus(
        subscription.id,
        'cancelled',
        subscription.end_date ? new Date(subscription.end_date) : undefined
      );

      console.log('Subscription canceled:', subscription.id);
    } catch (error) {
      console.error('Error handling subscription cancellation:', error);
    }
  }

  /**
   * Determine plan type from Polar product ID
   */
  private static determinePlanTypeFromProductId(productId: string): PlanType | null {
    const { POLAR_PRODUCTS } = require('@/lib/plans');
    
    if (productId === POLAR_PRODUCTS.basic.productId) {
      return 'basic';
    } else if (productId === POLAR_PRODUCTS.pro.productId) {
      return 'pro';
    }
    
    return null;
  }
}
