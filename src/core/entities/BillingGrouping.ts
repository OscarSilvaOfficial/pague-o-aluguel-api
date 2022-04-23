import { Billing } from './Billing';

export interface IBillingGrouping {
  id?: number;
  name: string;
  description: string;
  billings: Billing[];
}

export class BillingGrouping {
  id?: number;
  name: string;
  description: string;
  billings: Billing[];

  constructor(billingGrouping: IBillingGrouping) {
    this.id = billingGrouping.id;
    this.name = billingGrouping.name;
    this.description = billingGrouping.description;
    this.billings = billingGrouping.billings;
  }
}
