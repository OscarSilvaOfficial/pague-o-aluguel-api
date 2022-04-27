import { Billing } from './Billing';

export interface IBillingGrouping {
  name: string;
  description: string;
  billings?: Billing[];
}

export class BillingGrouping {
  name: string;
  description: string;
  billings?: Billing[];

  constructor(billingGrouping: IBillingGrouping) {
    this.name = billingGrouping.name;
    this.description = billingGrouping.description;
    this.billings = billingGrouping.billings;
  }
}
