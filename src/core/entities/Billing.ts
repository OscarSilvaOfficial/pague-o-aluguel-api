import { IBilling } from '@/helpers/interfaces/entities';
import { NotRemaningInstallmentsError } from '../helpers/exceptions/billing.exceptions';
import { BillingStatus } from '../helpers/interfaces/billingStatus';

export class Billing {
  private _name: string;
  private _dueDate: Date;
  private _amount: number;
  private _status: BillingStatus;
  private _totalNumberOfInstallments?: number;
  private _totalOfInstallmentsPaid?: number;

  constructor(billing: IBilling) {
    this._name = billing.name;
    this._dueDate = billing.dueDate;
    this._amount = billing.amount;
    this._status = billing.status;
    this._totalNumberOfInstallments = billing.totalNumberOfInstallments || 0;
    this._totalOfInstallmentsPaid = billing.totalOfInstallmentsPaid || 0;
  }

  fixedPayment(): boolean {
    return this._totalNumberOfInstallments === 0;
  }

  daysToExpire(): number {
    const today = new Date();
    return this._dueDate.getUTCDate() - today.getUTCDate();
  }

  isExpired(): boolean {
    return this.daysToExpire() < 0;
  }

  isPaid(): boolean {
    return this._status === BillingStatus.PAID;
  }

  remainingInstallments(): number {
    if (this.fixedPayment()) {
      const message =
        "This billing doesn't have installments because it's fixed payment";
      throw new NotRemaningInstallmentsError(message);
    }
    return this._totalNumberOfInstallments - this._totalOfInstallmentsPaid;
  }

  get name(): string {
    return this._name;
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): BillingStatus {
    return this._status;
  }

  get totalNumberOfInstallments(): number {
    return this._totalNumberOfInstallments;
  }

  get totalOfInstallmentsPaid(): number {
    return this._totalOfInstallmentsPaid;
  }
}
