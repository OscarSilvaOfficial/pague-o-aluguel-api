import { Billing } from '@/core/entities/Billing';

export interface BillingRepositoryContract {
  create(billing: Billing): Promise<object>;
}
