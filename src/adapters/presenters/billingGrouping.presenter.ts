import { BillingGrouping } from '@/core/entities/BillingGrouping';
import { GroupBillingDatabaseForm } from '@/main/helpers/interfaces/presenters/groupBilling';
import { ResponseTypes } from '@/main/helpers/interfaces/presenters/response.types';
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
    const defaultResponse = {
      name: billingEntity.name,
      description: billingEntity.description,
    };
    if (!billingEntity.billings) return defaultResponse;
    return {
      ...defaultResponse,
      billings: {
        create: billingEntity.billings.map((billing) =>
          BillingPresenter.convertBillingEntityToDatabaseResponse(billing),
        )
      }
    }
  }

  static createGroupBillingResponseAPI(groupBillings: GroupBillingDatabaseForm): GroupBillingDatabaseForm {
    const response: GroupBillingDatabaseForm = {
      id: groupBillings.id,
      name: groupBillings.name,
      description: groupBillings.description,
    }

    if (groupBillings.billings) {
      response.billings = groupBillings.billings.map((billing) => ({
        id: billing.id,
        name: billing.name,
        dueDate: billing.dueDate,
        amount: billing.amount,
        status: billing.status,
        totalNumberOfInstallments: billing.totalNumberOfInstallments,
        totalOfInstallmentsPaid: billing.totalOfInstallmentsPaid,
      }))
    }

    return response
    
  }

  static getAllBillingGroupingsResponseAPI(
    groupBillings: GroupBillingDatabaseForm[],
  ): GroupBillingDatabaseForm[] {
    return groupBillings.map((group) => {
      const response: GroupBillingDatabaseForm = {
        id: group.id,
        name: group.name,
        description: group.description,
      }

      if (group.billings) {
        response.billings = group.billings.map((billing) => ({
          id: billing.id,
          name: billing.name,
          dueDate: billing.dueDate,
          amount: billing.amount,
          status: billing.status,
          totalNumberOfInstallments: billing.totalNumberOfInstallments,
          totalOfInstallmentsPaid: billing.totalOfInstallmentsPaid,
        }))
      }

      return response
    });
  }
}
