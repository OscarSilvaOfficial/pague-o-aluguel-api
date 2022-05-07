import { IsNotEmpty } from 'class-validator';
import { BillingAPIRequest } from './billingAPIRequest';

export class BillingGroupingAPIRequest {
  @IsNotEmpty()
  name: string;
  description: string;

  billings?: BillingAPIRequest[];
}
