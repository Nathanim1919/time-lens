import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { prisma } from "./prisma";

// Initialize Polar client
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  // Use 'sandbox' for development, 'production' for live
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    process.env.CORS_ORIGIN || "",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://ee8575b17ecc.ngrok-free.app"
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
             use: [
         checkout({
           products: [
             {
               productId: process.env.POLAR_BASIC_PRODUCT_ID!,
               slug: "Basic", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Basic
             },
             {
               productId: process.env.POLAR_PRO_PRODUCT_ID!,
               slug: "Pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Pro
             },
           ],
           successUrl: "/dashboard?checkout_id={CHECKOUT_ID}",
           authenticatedUsersOnly: true,
         }),
         portal(),
         usage(),
         webhooks({
           secret: process.env.POLAR_WEBHOOK_SECRET!,
           onCustomerStateChanged: async (payload) => {
             console.log("Customer state changed:", payload);
           },
           onOrderPaid: async (payload) => {
             console.log("Order paid:", payload);
             // Process the order payment
             await import('@/services/TransactionService').then(({ TransactionService }) => {
               return TransactionService.processPolarWebhook(payload);
             });
           },
           onSubscriptionActive: async (payload) => {
             console.log("Subscription activated:", payload);
             // Handle subscription activation
             await import('@/services/SubscriptionService').then(({ SubscriptionService }) => {
               return SubscriptionService.handleSubscriptionActivated(payload);
             });
           },
           onSubscriptionCanceled: async (payload) => {
             console.log("Subscription canceled:", payload);
             // Handle subscription cancellation
             await import('@/services/SubscriptionService').then(({ SubscriptionService }) => {
               return SubscriptionService.handleSubscriptionCanceled(payload);
             });
           },
           onPayload: async (payload) => {
             console.log("Polar webhook received:", payload);
           }
         })
       ],
    }),
  ],
});
