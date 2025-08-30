import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { payments } from '../../../lib/payments';
import { CreditPurchase } from '../../../types';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get available credit packages
    const creditPackages = payments.getCreditPackages();

    return NextResponse.json({
      success: true,
      data: {
        current_credits: user.credits,
        available_packages: creditPackages,
      },
    });
  } catch (error) {
    console.error('Credits fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch credits information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: CreditPurchase = await request.json();
    const { credits, amount, payment_method } = body;

    if (!credits || !amount || !payment_method) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: credits, amount, and payment_method' },
        { status: 400 }
      );
    }

    // Validate purchase
    if (!payments.validatePurchase(credits, amount)) {
      return NextResponse.json(
        { success: false, error: 'Invalid credit package pricing' },
        { status: 400 }
      );
    }

    // Process payment
    const transaction = await payments.purchaseCredits(body, user.id);

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        message: 'Credit purchase initiated successfully',
      },
    });
  } catch (error) {
    console.error('Credit purchase error:', error);
    return NextResponse.json(
      { success: false, error: 'Credit purchase failed. Please try again.' },
      { status: 500 }
    );
  }
}
