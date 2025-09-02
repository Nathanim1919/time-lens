import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { SubscriptionService } from '@/services/SubscriptionService';
import { PlanType } from '@/lib/plans';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        // Get current subscription status
        const status = await SubscriptionService.getUserSubscription(userId);
        return NextResponse.json(status);

      case 'history':
        // Get subscription history
        const history = await SubscriptionService.getSubscriptionHistory(userId);
        return NextResponse.json(history);

      case 'can-upgrade':
        // Check if user can upgrade to a specific plan
        const targetPlan = searchParams.get('plan') as PlanType;
        if (!targetPlan) {
          return NextResponse.json({ error: 'Plan parameter required' }, { status: 400 });
        }
        const canUpgrade = await SubscriptionService.canUpgradeToPlan(userId, targetPlan);
        return NextResponse.json(canUpgrade);

      case 'can-downgrade':
        // Check if user can downgrade to a specific plan
        const downgradePlan = searchParams.get('plan') as PlanType;
        if (!downgradePlan) {
          return NextResponse.json({ error: 'Plan parameter required' }, { status: 400 });
        }
        const canDowngrade = await SubscriptionService.canDowngradeToPlan(userId, downgradePlan);
        return NextResponse.json(canDowngrade);

      default:
        // Default: return current subscription status
        const defaultStatus = await SubscriptionService.getUserSubscription(userId);
        return NextResponse.json(defaultStatus);
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { action, plan } = await request.json();

    switch (action) {
      case 'cancel':
        // Cancel subscription
        await SubscriptionService.cancelSubscription(userId);
        return NextResponse.json({ success: true });

      case 'check-upgrade':
        // Check upgrade eligibility
        if (!plan) {
          return NextResponse.json({ error: 'Plan parameter required' }, { status: 400 });
        }
        const upgradeCheck = await SubscriptionService.canUpgradeToPlan(userId, plan);
        return NextResponse.json(upgradeCheck);

      case 'check-downgrade':
        // Check downgrade eligibility
        if (!plan) {
          return NextResponse.json({ error: 'Plan parameter required' }, { status: 400 });
        }
        const downgradeCheck = await SubscriptionService.canDowngradeToPlan(userId, plan);
        return NextResponse.json(downgradeCheck);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
