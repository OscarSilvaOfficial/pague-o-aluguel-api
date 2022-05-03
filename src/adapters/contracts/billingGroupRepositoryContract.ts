import { BillingGrouping } from '@/core/entities/BillingGrouping';

export interface BillingGroupRepositoryContract<T> {
  all(): Promise<T[]>;
  create(billingGrouping: BillingGrouping): Promise<T>;
}
