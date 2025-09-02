import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
});

// Lazy connection - only connect when needed
let isConnected = false;

export async function ensureConnection() {
  if (!isConnected) {
    try {
      await prisma.$connect();
      console.log('✅ Database connected successfully');
      isConnected = true;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }
  return prisma;
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;