import { Billing } from '@/core/entities/Billing';
import { BillingDatabaseForm } from './helpers/interfaces/billing';

export enum ResponseTypes {
  JSON,
}

export class BillingPresenter {
  constructor(
    private billing: BillingDatabaseForm,
    private responseType: ResponseTypes,
  ) {}

  private jsonResponse() {
    return this.billing;
  }

  getBilling() {
    return {
      [ResponseTypes.JSON]: this.jsonResponse(),
    }[this.responseType];
  }

  static convertBillingEntityToDatabaseResponse(billingEntity: Billing): BillingDatabaseForm {
    return {
      name: billingEntity.name,
      amount: billingEntity.amount,
      dueDate: billingEntity.dueDate,
      status: billingEntity.status,
      totalNumberOfInstallments: billingEntity.totalNumberOfInstallments,
      totalOfInstallmentsPaid: billingEntity.totalOfInstallmentsPaid,
    }
  }
}
