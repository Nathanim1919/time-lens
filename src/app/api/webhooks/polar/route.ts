import { NextRequest, NextResponse } from 'next/server';
import { TransactionService } from '@/services/TransactionService';
import { SubscriptionService } from '@/services/SubscriptionService';
import { PlanType } from '@/lib/plans';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('polar-signature');
    
    // TODO: Verify webhook signature for security
    // const isValid = verifyPolarSignature(body, signature, process.env.POLAR_WEBHOOK_SECRET!);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    const event = JSON.parse(body);
    console.log('Polar webhook received:', event.type);

    switch (event.type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data);
        break;

      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data);
        break;

      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.data);
        break;

      case 'order.paid':
        await TransactionService.processPolarWebhook(event);
        break;

      case 'order.failed':
        await TransactionService.processPolarWebhook(event);
        break;

      default:
        console.log(`Unhandled Polar webhook event: ${event.type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Polar webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(data: any) {
  const { subscription, customer } = data;
  
  // Find user by Polar customer ID
  const { PrismaClient } = await import('@/generated/prisma');
  const prisma = new PrismaClient();
  
  try {
    const user = await prisma.user.findFirst({
      where: { polarCustomerId: customer.id }
    });

    if (!user) {
      console.error('User not found for Polar customer:', customer.id);
      return;
    }

    // Determine plan type from subscription
    const planType = determinePlanType(subscription.product_id) as PlanType;
    
    if (!planType) {
      console.error('Unknown product ID:', subscription.product_id);
      return;
    }

    // Create subscription record
    await SubscriptionService.createSubscription({
      subscriptionId: subscription.id,
      userId: user.id,
      planType,
      polarCustomerId: customer.id,
      startDate: new Date(subscription.created_at),
      nextBillingDate: new Date(subscription.next_billing_date)
    });

    console.log('Subscription created:', subscription.id);
  } finally {
    await prisma.$disconnect();
  }
}

async function handleSubscriptionUpdated(data: any) {
  const { subscription } = data;
  
  // Update subscription status
  await SubscriptionService.updateSubscriptionStatus(
    subscription.id,
    subscription.status,
    subscription.next_billing_date ? new Date(subscription.next_billing_date) : undefined
  );

  console.log('Subscription updated:', subscription.id);
}

async function handleSubscriptionCanceled(data: any) {
  const { subscription } = data;
  
  // Update subscription status to cancelled
  await SubscriptionService.updateSubscriptionStatus(
    subscription.id,
    'cancelled',
    subscription.end_date ? new Date(subscription.end_date) : undefined
  );

  console.log('Subscription canceled:', subscription.id);
}

function determinePlanType(productId: string): PlanType | null {
  const { POLAR_PRODUCTS } = require('@/lib/plans');
  
  if (productId === POLAR_PRODUCTS.basic.productId) {
    return 'basic';
  } else if (productId === POLAR_PRODUCTS.pro.productId) {
    return 'pro';
  }
  
  return null;
}
