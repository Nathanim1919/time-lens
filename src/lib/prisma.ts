import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database helper functions
export const db = {
  // User operations
  async getUser(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  async updateUserCredits(userId: string, credits: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: { credits },
    });
  },

  async createUser(userData: { email: string; name: string; credits?: number }) {
    return await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        credits: userData.credits ?? 2,
      },
    });
  },

  // Image operations
  async createImage(imageData: Omit<import('../types').Image, 'id' | 'created_at'>) {
    return await prisma.image.create({
      data: {
        userId: imageData.user_id,
        originalUrl: imageData.original_url,
        generatedUrl: imageData.generated_url,
        eraTheme: imageData.era_theme,
      },
    });
  },

  async getUserImages(userId: string) {
    return await prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  // Transaction operations
  async createTransaction(transactionData: Omit<import('../types').Transaction, 'id' | 'created_at'>) {
    return await prisma.transaction.create({
      data: {
        userId: transactionData.user_id,
        amount: transactionData.amount,
        creditsAdded: transactionData.credits_added,
        status: transactionData.status,
      },
    });
  },

  async getUserTransactions(userId: string) {
    return await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async updateTransactionStatus(transactionId: string, status: string) {
    return await prisma.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
  },

  async getTransaction(transactionId: string) {
    return await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
  },
};
