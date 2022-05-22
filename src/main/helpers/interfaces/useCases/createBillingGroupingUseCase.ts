import { BillingStatus } from "../billingStatus";


export interface CreateBillingGroupingUseCaseResponse {
  id?: number;
  name: string;
  description: string;
  billings?: CreateBillingUseCaseResponse[];
}

export interface CreateBillingUseCaseResponse {
  id?: number;
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}