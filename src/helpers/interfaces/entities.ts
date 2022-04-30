import { BillingStatus } from '@/core/helpers/interfaces/billingStatus';

export interface IBilling {
  name: string;
  dueDate: Date;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}
