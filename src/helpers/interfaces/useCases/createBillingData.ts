import { BillingStatus } from '@/core/helpers/interfaces/billingStatus';

export interface ICreateBillingData {
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
