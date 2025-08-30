import { CreditPurchase, Transaction } from '../types';
import { db } from './supabase';

// Payment service configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const POLAR_SECRET_KEY = process.env.POLAR_SECRET_KEY;

// Credit package configurations
export const CREDIT_PACKAGES = [
  { credits: 10, amount: 4.00, pricePerCredit: 0.40 },
  { credits: 25, amount: 9.00, pricePerCredit: 0.36 },
  { credits: 50, amount: 15.00, pricePerCredit: 0.30 },
  { credits: 100, amount: 25.00, pricePerCredit: 0.25 },
];

// Stripe payment processing
async function processStripePayment(
  amount: number, 
  credits: number, 
  userId: string
): Promise<Transaction> {
  if (!STRIPE_SECRET_KEY) {
    throw new Error('Stripe not configured');
  }

  try {
    // Create Stripe payment intent
    const response = await fetch('/api/payments/stripe/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        credits,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();

    // Create transaction record
    const transaction = await db.createTransaction({
      user_id: userId,
      amount,
      credits_added: credits,
      status: 'pending',
    });

    return transaction;
  } catch (error) {
    console.error('Stripe payment error:', error);
    throw new Error('Payment processing failed');
  }
}

// Polar payment processing
async function processPolarPayment(
  amount: number, 
  credits: number, 
  userId: string
): Promise<Transaction> {
  if (!POLAR_SECRET_KEY) {
    throw new Error('Polar not configured');
  }

  try {
    // Create Polar payment
    const response = await fetch('/api/payments/polar/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${POLAR_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        credits,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Polar payment');
    }

    const { paymentId } = await response.json();

    // Create transaction record
    const transaction = await db.createTransaction({
      user_id: userId,
      amount,
      credits_added: credits,
      status: 'pending',
    });

    return transaction;
  } catch (error) {
    console.error('Polar payment error:', error);
    throw new Error('Payment processing failed');
  }
}

// Main payment service
export const payments = {
  // Process credit purchase
  async purchaseCredits(purchase: CreditPurchase, userId: string): Promise<Transaction> {
    try {
      let transaction: Transaction;

      if (purchase.payment_method === 'stripe') {
        transaction = await processStripePayment(purchase.amount, purchase.credits, userId);
      } else if (purchase.payment_method === 'polar') {
        transaction = await processPolarPayment(purchase.amount, purchase.credits, userId);
      } else {
        throw new Error('Invalid payment method');
      }

      return transaction;
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  },

  // Confirm payment completion
  async confirmPayment(transactionId: string, paymentIntentId: string): Promise<void> {
    try {
      // Update transaction status
      await db.updateTransactionStatus(transactionId, 'completed');

      // Get transaction details
      const transaction = await db.getTransaction(transactionId);
      if (!transaction) throw new Error('Transaction not found');

      // Add credits to user account
      const user = await db.getUser(transaction.user_id);
      if (!user) throw new Error('User not found');

      const newCredits = user.credits + transaction.credits_added;
      await db.updateUserCredits(transaction.user_id, newCredits);

    } catch (error) {
      console.error('Payment confirmation error:', error);
      throw error;
    }
  },

  // Get available credit packages
  getCreditPackages() {
    return CREDIT_PACKAGES;
  },

  // Calculate price for custom credit amount
  calculatePrice(credits: number): number {
    if (credits <= 10) return credits * 0.50;
    if (credits <= 25) return credits * 0.40;
    if (credits <= 50) return credits * 0.36;
    if (credits <= 100) return credits * 0.30;
    return credits * 0.25; // Best price for 100+ credits
  },

  // Validate credit purchase
  validatePurchase(credits: number, amount: number): boolean {
    const expectedAmount = this.calculatePrice(credits);
    return Math.abs(expectedAmount - amount) < 0.01; // Allow for small rounding differences
  },
};

// Payment webhook handlers
export const webhooks = {
  // Handle Stripe webhook
  async handleStripeWebhook(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await payments.confirmPayment(
            event.data.object.metadata.transactionId,
            event.data.object.id
          );
          break;
        
        case 'payment_intent.payment_failed':
          // Handle failed payment
          console.log('Payment failed:', event.data.object.id);
          break;
      }
    } catch (error) {
      console.error('Stripe webhook error:', error);
      throw error;
    }
  },

  // Handle Polar webhook
  async handlePolarWebhook(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'payment.succeeded':
          await payments.confirmPayment(
            event.data.transactionId,
            event.data.paymentId
          );
          break;
        
        case 'payment.failed':
          // Handle failed payment
          console.log('Payment failed:', event.data.paymentId);
          break;
      }
    } catch (error) {
      console.error('Polar webhook error:', error);
      throw error;
    }
  },
};
