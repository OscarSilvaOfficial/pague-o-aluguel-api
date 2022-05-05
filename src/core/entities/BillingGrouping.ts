import { ApiProperty } from '@nestjs/swagger';
import { Billing } from './Billing';

export interface IBillingGrouping {
  name: string;
  description: string;
  billings?: Billing[];
}

export class BillingGrouping {

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Billing, isArray: true })
  billings?: Billing[];

  constructor(billingGrouping: IBillingGrouping) {
    this.name = billingGrouping.name;
    this.description = billingGrouping.description;
    this.billings = billingGrouping.billings;
  }
}
