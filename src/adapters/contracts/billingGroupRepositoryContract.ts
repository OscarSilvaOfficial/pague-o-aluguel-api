import { BillingGrouping } from '@/core/entities/BillingGrouping';

export interface BillingGroupRepositoryContract<T> {
  create(billingGrouping: BillingGrouping): Promise<T>;
}
