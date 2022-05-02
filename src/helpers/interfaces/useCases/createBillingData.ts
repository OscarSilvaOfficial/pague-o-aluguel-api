import { BillingStatus } from "../billingStatus";

export interface ICreateBillingData {
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
