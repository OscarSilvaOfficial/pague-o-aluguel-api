import { IBilling } from '@/main/helpers/interfaces/entities';
import { NotRemaningInstallmentsError } from '../../main/helpers/interfaces/exceptions/billing.exceptions';
import { BillingStatus } from '../../main/helpers/interfaces/billingStatus';
import { ApiProperty } from '@nestjs/swagger';

export class Billing {
  private _name: string;
  private _dueDate: number;
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
    const date1 = new Date(Date.now());
    const date2 = new Date(this._dueDate);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    return parseInt(diffInDays.toFixed(0));
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

  @ApiProperty()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  get dueDate(): number {
    return this._dueDate;
  }

  @ApiProperty()
  get amount(): number {
    return this._amount;
  }

  @ApiProperty()
  get status(): BillingStatus {
    return this._status;
  }

  @ApiProperty()
  get totalNumberOfInstallments(): number {
    return this._totalNumberOfInstallments;
  }

  @ApiProperty()
  get totalOfInstallmentsPaid(): number {
    return this._totalOfInstallmentsPaid;
  }
}
