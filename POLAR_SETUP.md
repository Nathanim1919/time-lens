# Polar Payment Integration Setup

This guide will help you set up Polar payments integration with Better Auth for TimeLens.

## Prerequisites

1. A Polar account at [polar.sh](https://polar.sh)
2. Better Auth configured in your project
3. Environment variables configured

## Step 1: Create Polar Products

1. Log into your Polar dashboard
2. Go to Products section
3. Create two products:

### Basic Plan
- **Name**: Basic Plan
- **Price**: $9.99/month
- **Description**: Perfect for individual users and small projects
- **Features**: 50 AI transformations per month, Standard resolution, Basic era styles

### Pro Plan
- **Name**: Pro Plan  
- **Price**: $29.99/month
- **Description**: For power users and professionals
- **Features**: Unlimited AI transformations, 4K resolution, All era styles, Priority support

## Step 2: Get Polar Credentials

1. Go to Organization Settings in Polar
2. Create an Organization Access Token
3. Copy the token for your environment variables

## Step 3: Configure Environment Variables

Add these to your `.env` file:

```env
# Polar Payment Integration
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
POLAR_BASIC_PRODUCT_ID=your_basic_product_id
POLAR_PRO_PRODUCT_ID=your_pro_product_id
```

## Step 4: Set Up Webhooks

1. In Polar dashboard, go to Webhooks
2. Add webhook endpoint: `https://yourdomain.com/api/auth/polar/webhooks`
3. Copy the webhook secret to your environment variables

## Step 5: Test the Integration

1. Start your development server
2. Navigate to `/pricing` to see the pricing page
3. Try subscribing to a plan
4. Check the customer portal at `/dashboard/subscription`

## Features Included

- ✅ Checkout integration with Polar
- ✅ Customer portal for subscription management
- ✅ Automatic customer creation on signup
- ✅ Webhook handling for payment events
- ✅ Usage-based billing support
- ✅ Subscription status tracking

## Usage Examples

### Starting a Checkout
```typescript
await authClient.checkout({
    slug: "basic" // or "pro"
});
```

### Opening Customer Portal
```typescript
await authClient.customer.portal();
```

### Getting Customer State
```typescript
const { data: customerState } = await authClient.customer.state();
```

### Ingesting Usage Events
```typescript
await authClient.usage.ingest({
    event: "ai-transformation",
    metadata: {
        style: "renaissance",
        resolution: "4k"
    }
});
```

## Troubleshooting

1. **Checkout not working**: Verify your Polar access token and product IDs
2. **Webhooks not receiving**: Ensure your webhook URL is correct and accessible
3. **Customer portal issues**: Check if the user is authenticated and has a customer record

## Support

For Polar-specific issues, visit the [Polar GitHub repo](https://github.com/polarsource/polar).
For Better Auth issues, check the [Better Auth documentation](https://www.better-auth.com).
