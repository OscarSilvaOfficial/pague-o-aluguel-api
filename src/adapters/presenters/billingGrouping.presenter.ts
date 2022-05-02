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
    return this.groupBilling;
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
      description: billingEntity.description
    };
  }
}
