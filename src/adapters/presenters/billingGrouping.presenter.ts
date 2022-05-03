import { BillingGrouping } from '@/core/entities/BillingGrouping';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';
import { ResponseTypes } from '@/helpers/interfaces/presenters/response.types';
import { BillingPresenter } from './billing.presenter';

export class BillingGroupingPresenter {
  constructor(
    private groupBilling: GroupBillingDatabaseForm,
    private responseType: ResponseTypes,
  ) {}

  private jsonResponse() {
    return {
      id: this.groupBilling.id,
      name: this.groupBilling.name,
      description: this.groupBilling.description,
      billings: this.groupBilling.billings.map((billing) => ({
        name: billing.name,
        dueDate: billing.dueDate,
        amount: billing.amount,
        status: billing.status,
        totalNumberOfInstallments: billing.totalNumberOfInstallments,
        totalOfInstallmentsPaid: billing.totalOfInstallmentsPaid,
      })),
    };
  }

  getBilling() {
    return {
      [ResponseTypes.JSON]: this.jsonResponse(),
    }[this.responseType];
  }

  static convertBillingGroupingEntityToDatabaseResponse(
    billingEntity: BillingGrouping,
  ) {
    if (billingEntity.billings) {
      const addBilling = billingEntity.billings.map((billing) =>
        BillingPresenter.convertBillingEntityToDatabaseResponse(billing),
      );
      return {
        name: billingEntity.name,
        description: billingEntity.description,
        billings: {
          create: addBilling,
        },
      };
    }
    return {
      name: billingEntity.name,
      description: billingEntity.description,
    };
  }
}
