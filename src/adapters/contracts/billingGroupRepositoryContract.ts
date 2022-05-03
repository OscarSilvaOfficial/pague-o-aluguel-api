import { BillingGrouping } from '@/core/entities/BillingGrouping';

export interface BillingGroupRepositoryContract<T> {
  all(billings: boolean): Promise<T[]>;
  create(billingGrouping: BillingGrouping): Promise<T>;
}
