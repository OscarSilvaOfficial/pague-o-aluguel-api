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
    const response: any = {
      name: billingEntity.name,
      description: billingEntity.description,
    };
    if (billingEntity.billings) {
      response.billings.create = billingEntity.billings.map((billing) =>
        BillingPresenter.convertBillingEntityToDatabaseResponse(billing),
      );
    }
    return response
  }

  static serializeResponseAPI(
    groupBillings: GroupBillingDatabaseForm[],
  ): GroupBillingDatabaseForm[] {
    return groupBillings.map((group) => {
      const defaultResponse = {
        id: group.id,
        name: group.name,
        description: group.description,
      }
      if (!group.billings) return defaultResponse
      return {
        ...defaultResponse,
        billings: group.billings.map((billing) => ({
          id: billing.id,
          name: billing.name,
          dueDate: parseInt(`${billing.dueDate}`),
          amount: billing.amount,
          status: billing.status,
          totalNumberOfInstallments: billing.totalNumberOfInstallments,
          totalOfInstallmentsPaid: billing.totalOfInstallmentsPaid,
        })),
      };
    });
  }
}
