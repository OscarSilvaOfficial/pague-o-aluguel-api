import { BillingStatus } from "../billingStatus";
import { IsNotEmpty } from 'class-validator';


export class BillingAPIRequest {
  @IsNotEmpty()
  id?: number;
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
