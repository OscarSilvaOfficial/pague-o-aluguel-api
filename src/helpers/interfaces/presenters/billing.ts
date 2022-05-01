import { BillingStatus } from '@/core/helpers/interfaces/billingStatus';

export interface BillingDatabaseForm {
  id?: number;
  name: string;
  dueDate: number;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
