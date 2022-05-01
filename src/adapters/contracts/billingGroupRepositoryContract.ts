import { BillingGrouping } from '@/core/entities/BillingGrouping';

export interface BillingGroupRepositoryContract {
  create(billingGrouping: BillingGrouping): Promise<object>;
}
