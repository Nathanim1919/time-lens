import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export type TransactionType = 'subscription_start' | 'recurring' | 'upgrade' | 'downgrade' | 'refund';
export type TransactionStatus = 'paid' | 'failed' | 'refunded' | 'pending';

export class TransactionService {
  /**
   * Create a new transaction record
   */
  static async createTransaction(data: {
    id: string; // Polar order ID
    userId: string;
    subscriptionId?: string;
    amountCents: number;
    currency: string;
    status: TransactionStatus;
    transactionType: TransactionType;
  }) {
    const transaction = await prisma.transaction.create({
      data: {
        id: data.id,
        userId: data.userId,
        subscriptionId: data.subscriptionId,
        amountCents: data.amountCents,
        currency: data.currency,
        status: data.status,
        transactionType: data.transactionType
      }
    });

    return transaction;
  }

  /**
   * Update transaction status
   */
  static async updateTransactionStatus(transactionId: string, status: TransactionStatus) {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status }
    });

    return transaction;
  }

  /**
   * Get user's transaction history
   */
  static async getUserTransactions(userId: string, limit: number = 50) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        subscription: {
          select: {
            planType: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return transactions;
  }

  /**
   * Get transaction by ID
   */
  static async getTransactionById(transactionId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        subscription: {
          select: {
            planType: true,
            status: true
          }
        }
      }
    });

    return transaction;
  }

  /**
   * Get revenue analytics
   */
  static async getRevenueAnalytics(period: 'month' | 'year' = 'month') {
    const startDate = new Date();
    if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Total revenue for period
    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        status: 'paid',
        createdAt: {
          gte: startDate
        }
      },
      _sum: {
        amountCents: true
      }
    });

    // Revenue by plan type
    const revenueByPlan = await prisma.transaction.groupBy({
      by: ['transactionType'],
      where: {
        status: 'paid',
        createdAt: {
          gte: startDate
        }
      },
      _sum: {
        amountCents: true
      }
    });

    // Monthly recurring revenue (MRR)
    const mrr = await prisma.transaction.aggregate({
      where: {
        status: 'paid',
        transactionType: 'recurring',
        createdAt: {
          gte: startDate
        }
      },
      _sum: {
        amountCents: true
      }
    });

    return {
      totalRevenue: totalRevenue._sum.amountCents || 0,
      mrr: mrr._sum.amountCents || 0,
      revenueByPlan: revenueByPlan.reduce((acc, plan) => {
        acc[plan.transactionType] = plan._sum.amountCents || 0;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  /**
   * Process Polar webhook for subscription events
   */
  static async processPolarWebhook(event: any) {
    try {
      switch (event.type) {
        case 'subscription.created':
          await this.handleSubscriptionCreated(event.data);
          break;
        case 'subscription.updated':
          await this.handleSubscriptionUpdated(event.data);
          break;
        case 'subscription.canceled':
          await this.handleSubscriptionCanceled(event.data);
          break;
        case 'order.paid':
          await this.handleOrderPaid(event.data);
          break;
        case 'order.failed':
          await this.handleOrderFailed(event.data);
          break;
        default:
          console.log(`Unhandled Polar webhook event: ${event.type}`);
      }
    } catch (error) {
      console.error('Error processing Polar webhook:', error);
      throw error;
    }
  }

  /**
   * Handle subscription.created webhook
   */
  private static async handleSubscriptionCreated(data: any) {
    // This would typically be handled by SubscriptionService
    // We'll just log it for now
    console.log('Subscription created:', data);
  }

  /**
   * Handle subscription.updated webhook
   */
  private static async handleSubscriptionUpdated(data: any) {
    // This would typically be handled by SubscriptionService
    console.log('Subscription updated:', data);
  }

  /**
   * Handle subscription.canceled webhook
   */
  private static async handleSubscriptionCanceled(data: any) {
    // This would typically be handled by SubscriptionService
    console.log('Subscription canceled:', data);
  }

  /**
   * Handle order.paid webhook
   */
  private static async handleOrderPaid(data: any) {
    const { order, customer } = data;

    // Find user by Polar customer ID
    const user = await prisma.user.findFirst({
      where: { polarCustomerId: customer.id }
    });

    if (!user) {
      console.error('User not found for Polar customer:', customer.id);
      return;
    }

    // Create transaction record
    await this.createTransaction({
      id: order.id,
      userId: user.id,
      subscriptionId: order.subscription_id,
      amountCents: order.total_amount,
      currency: order.currency,
      status: 'paid',
      transactionType: this.determineTransactionType(order)
    });

    console.log('Order paid processed:', order.id);
  }

  /**
   * Handle order.failed webhook
   */
  private static async handleOrderFailed(data: any) {
    const { order, customer } = data;

    // Find user by Polar customer ID
    const user = await prisma.user.findFirst({
      where: { polarCustomerId: customer.id }
    });

    if (!user) {
      console.error('User not found for Polar customer:', customer.id);
      return;
    }

    // Create failed transaction record
    await this.createTransaction({
      id: order.id,
      userId: user.id,
      subscriptionId: order.subscription_id,
      amountCents: order.total_amount,
      currency: order.currency,
      status: 'failed',
      transactionType: this.determineTransactionType(order)
    });

    // Update user's subscription status to past_due
    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: 'past_due' }
    });

    console.log('Order failed processed:', order.id);
  }

  /**
   * Determine transaction type based on order data
   */
  private static determineTransactionType(order: any): TransactionType {
    // This is a simplified logic - in real app you'd have more sophisticated logic
    if (order.subscription_id) {
      // Check if this is the first payment for this subscription
      return 'subscription_start';
    }
    return 'recurring';
  }

  /**
   * Get failed transactions for retry analysis
   */
  static async getFailedTransactions() {
    return await prisma.transaction.findMany({
      where: {
        status: 'failed'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get refund transactions
   */
  static async getRefundTransactions() {
    return await prisma.transaction.findMany({
      where: {
        status: 'refunded'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Calculate total revenue for a specific period
   */
  static async calculateRevenue(startDate: Date, endDate: Date) {
    const revenue = await prisma.transaction.aggregate({
      where: {
        status: 'paid',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        amountCents: true
      }
    });

    return revenue._sum.amountCents || 0;
  }
}
