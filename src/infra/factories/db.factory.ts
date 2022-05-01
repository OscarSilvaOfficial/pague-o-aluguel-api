import { BillingRepository } from '@/adapters/repositories/billingRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaDB } from '../db/prisma.db';

export const prismaDBFactory = () => {
  const prisma = new PrismaClient();
  const db = new PrismaDB(prisma);
  return new BillingRepository(db);
};
