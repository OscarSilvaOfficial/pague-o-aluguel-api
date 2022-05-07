import { IsNotEmpty } from 'class-validator';
import { BillingAPIRequest } from './billingAPIRequest';

export class BillingGroupingAPIRequest {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  description: string;

  billings?: BillingAPIRequest[];
}
