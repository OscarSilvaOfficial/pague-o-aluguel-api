import { NotRemaningInstallmentsError } from '../utils/exceptions/billing.exceptions';

export enum BillingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export interface IBilling {
  name: string;
  dueDate: Date;
  amount: number;
  status: BillingStatus;
  totalNumberOfInstallments: number;
  totalOfInstallmentsPaid: number;
}

export class Billing {
  private name: string;
  private dueDate: Date;
  private amount: number;
  private status: BillingStatus;
  private totalNumberOfInstallments?: number;
  private totalOfInstallmentsPaid?: number;

  constructor(billing: IBilling) {
    this.name = billing.name;
    this.dueDate = billing.dueDate;
    this.amount = billing.amount;
    this.status = billing.status;
    this.totalNumberOfInstallments = billing.totalNumberOfInstallments || 0;
    this.totalOfInstallmentsPaid = billing.totalOfInstallmentsPaid || 0;
  }

  fixedPayment(): boolean {
    return this.totalNumberOfInstallments === 0;
  }

  daysToExpire(): number {
    const today = new Date();
    return this.dueDate.getUTCDate() - today.getUTCDate();
  }

  isExpired(): boolean {
    return this.daysToExpire() < 0;
  }

  isPaid(): boolean {
    return this.status === BillingStatus.PAID;
  }

  remainingInstallments(): number {
    if (this.fixedPayment()) {
      const message =
        "This billing doesn't have installments because it's fixed payment";
      throw new NotRemaningInstallmentsError(message);
    }
    return this.totalNumberOfInstallments - this.totalOfInstallmentsPaid;
  }
}
