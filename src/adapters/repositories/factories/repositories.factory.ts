import { BillingDatabaseForm } from '@/helpers/interfaces/presenters/billing';
import { BillingRepository } from '@/adapters/repositories/billingRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaDB } from '@/infra/db/prisma.db';

export const BillingRepositoryFactory = () => {
  const prisma = new PrismaClient();
  const model = prisma.billing
  const db = new PrismaDB<BillingDatabaseForm, typeof model>(model);
  return new BillingRepository(db);
};
