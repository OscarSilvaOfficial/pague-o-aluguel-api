import { Billing } from '@/core/entities/Billing';
import { ResponseTypes } from '@/helpers/interfaces/presenters/response.types';
import { BillingDatabaseForm } from '../../helpers/interfaces/presenters/billing';

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
