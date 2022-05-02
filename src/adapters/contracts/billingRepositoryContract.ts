import { Billing } from '@/core/entities/Billing';

export interface BillingRepositoryContract<T> {
  create(billing: Billing): Promise<T>;
}
