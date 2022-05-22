import { BillingStatus } from "../billingStatus";


export interface GetAllBillingGroupingUseCaseResponse {
  id?: number;
  name: string;
  description: string;
  billings?: GetAllBillingUseCaseResponse[];
}

export interface GetAllBillingUseCaseResponse {
  id?: number;
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}