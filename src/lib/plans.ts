// Plan Configuration for Time Lens Subscription System

export const PLAN_LIMITS = {
  free: {
    dailyTransformations: 2,
    quality: 'standard',
    support: 'community',
    price: 0,
    features: [
      'Basic image transformations',
      'Standard quality output',
      'Community support'
    ]
  },
  basic: {
    dailyTransformations: 50,
    quality: 'standard', 
    support: 'email',
    price: 999, // $9.99 in cents
    features: [
      '50 transformations per day',
      'Standard quality output',
      'Email support',
      'All era themes'
    ]
  },
  pro: {
    dailyTransformations: -1, // unlimited
    quality: 'premium',
    support: 'priority',
    price: 1999, // $19.99 in cents
    features: [
      'Unlimited transformations',
      'Premium quality output',
      'Priority support',
      'All era themes',
      'Advanced AI models'
    ]
  }
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export const POLAR_PRODUCTS = {
  basic: {
    productId: process.env.POLAR_BASIC_PRODUCT_ID!,
    slug: "Basic"
  },
  pro: {
    productId: process.env.POLAR_PRO_PRODUCT_ID!,
    slug: "Pro"
  }
} as const;

// Helper functions
export function getPlanLimit(planType: PlanType): number {
  return PLAN_LIMITS[planType].dailyTransformations;
}

export function isUnlimited(planType: PlanType): boolean {
  return PLAN_LIMITS[planType].dailyTransformations === -1;
}

export function getPlanPrice(planType: PlanType): number {
  return PLAN_LIMITS[planType].price;
}

export function getPlanFeatures(planType: PlanType): readonly string[] {
  return PLAN_LIMITS[planType].features;
}

export function canUpgrade(fromPlan: PlanType, toPlan: PlanType): boolean {
  const planOrder = ['free', 'basic', 'pro'];
  const fromIndex = planOrder.indexOf(fromPlan);
  const toIndex = planOrder.indexOf(toPlan);
  return toIndex > fromIndex;
}

export function canDowngrade(fromPlan: PlanType, toPlan: PlanType): boolean {
  const planOrder = ['free', 'basic', 'pro'];
  const fromIndex = planOrder.indexOf(fromPlan);
  const toIndex = planOrder.indexOf(toPlan);
  return toIndex < fromIndex;
}
