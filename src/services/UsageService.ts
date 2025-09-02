import { prisma, ensureConnection } from '@/lib/prisma';
import { getPlanLimit, isUnlimited, PlanType } from '@/lib/plans';

export class UsageService {
  /**
   * Check if user can perform a transformation based on their daily limit
   */
  static async canTransform(userId: string): Promise<{ canTransform: boolean; remaining: number; limit: number }> {
    const db = await ensureConnection();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get user's current plan
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const planType = user.currentPlan as PlanType;
    const dailyLimit = getPlanLimit(planType);

    // If unlimited plan, always allow
    if (isUnlimited(planType)) {
      return { canTransform: true, remaining: -1, limit: -1 };
    }

    // Get or create today's usage log
    let usageLog = await db.usageLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: today
        }
      }
    });

    if (!usageLog) {
      // Create new usage log for today
      usageLog = await db.usageLog.create({
        data: {
          userId,
          date: today,
          transformationsCount: 0,
          planType,
          dailyLimit
        }
      });
    }

    const remaining = Math.max(0, dailyLimit - usageLog.transformationsCount);
    const canTransform = remaining > 0;

    return { canTransform, remaining, limit: dailyLimit };
  }

  /**
   * Increment user's daily transformation count
   */
  static async incrementUsage(userId: string): Promise<void> {
    const db = await ensureConnection();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get user's current plan
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const planType = user.currentPlan as PlanType;
    const dailyLimit = getPlanLimit(planType);

    // Update usage log
    await db.usageLog.upsert({
      where: {
        userId_date: {
          userId,
          date: today
        }
      },
      update: {
        transformationsCount: {
          increment: 1
        }
      },
      create: {
        userId,
        date: today,
        transformationsCount: 1,
        planType,
        dailyLimit
      }
    });
  }

  /**
   * Get user's usage statistics
   */
  static async getUserUsageStats(userId: string): Promise<{
    today: { count: number; limit: number; remaining: number };
    thisMonth: { count: number; average: number };
    total: number;
  }> {
    const db = await ensureConnection();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get user's current plan
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { currentPlan: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const planType = user.currentPlan as PlanType;
    const dailyLimit = getPlanLimit(planType);

    // Get today's usage
    const todayUsage = await db.usageLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: today
        }
      }
    });

    const todayCount = todayUsage?.transformationsCount || 0;
    const remaining = isUnlimited(planType) ? -1 : Math.max(0, dailyLimit - todayCount);

    // Get this month's usage
    const thisMonthUsage = await db.usageLog.findMany({
      where: {
        userId,
        date: {
          gte: startOfMonth
        }
      },
      select: { transformationsCount: true }
    });

    const thisMonthCount = thisMonthUsage.reduce((sum, log) => sum + log.transformationsCount, 0);
    const thisMonthAverage = thisMonthUsage.length > 0 ? thisMonthCount / thisMonthUsage.length : 0;

    // Get total usage
    const totalUsage = await db.usageLog.aggregate({
      where: { userId },
      _sum: { transformationsCount: true }
    });

    return {
      today: {
        count: todayCount,
        limit: dailyLimit,
        remaining
      },
      thisMonth: {
        count: thisMonthCount,
        average: Math.round(thisMonthAverage * 100) / 100
      },
      total: totalUsage._sum.transformationsCount || 0
    };
  }

  /**
   * Get user's usage history for the last 30 days
   */
  static async getUserUsageHistory(userId: string, days: number = 30): Promise<Array<{ date: string; count: number }>> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const usageHistory = await prisma.usageLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        date: true,
        transformationsCount: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return usageHistory.map(log => ({
      date: log.date.toISOString().split('T')[0],
      count: log.transformationsCount
    }));
  }

  /**
   * Reset user's usage (useful for testing or admin purposes)
   */
  static async resetUserUsage(userId: string, date?: Date): Promise<void> {
    const targetDate = date || new Date();
    targetDate.setHours(0, 0, 0, 0);

    await prisma.usageLog.updateMany({
      where: {
        userId,
        date: targetDate
      },
      data: {
        transformationsCount: 0
      }
    });
  }

  /**
   * Get usage analytics for admin dashboard
   */
  static async getUsageAnalytics(): Promise<{
    totalUsers: number;
    activeUsers: number;
    totalTransformations: number;
    averageTransformationsPerUser: number;
    planDistribution: Record<string, number>;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total users
    const totalUsers = await prisma.user.count();

    // Active users (users who have used the service today)
    const activeUsers = await prisma.usageLog.groupBy({
      by: ['userId'],
      where: {
        date: today,
        transformationsCount: {
          gt: 0
        }
      }
    }).then(groups => groups.length);

    // Total transformations
    const totalTransformations = await prisma.usageLog.aggregate({
      _sum: { transformationsCount: true }
    });

    // Plan distribution
    const planDistribution = await prisma.user.groupBy({
      by: ['currentPlan'],
      _count: {
        currentPlan: true
      }
    });

    const planDist = planDistribution.reduce((acc, plan) => {
      acc[plan.currentPlan] = plan._count.currentPlan;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      activeUsers,
      totalTransformations: totalTransformations._sum.transformationsCount || 0,
      averageTransformationsPerUser: totalUsers > 0 ? (totalTransformations._sum.transformationsCount || 0) / totalUsers : 0,
      planDistribution: planDist
    };
  }
}
