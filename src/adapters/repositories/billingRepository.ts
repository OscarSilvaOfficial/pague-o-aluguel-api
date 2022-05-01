import { Billing } from '@/core/entities/Billing';
import {
  BillingPresenter,
  ResponseTypes,
} from '@/adapters/presenters/billing.presenter';
import { BillingRepositoryContract } from '../contracts/billingRepositoryContract';
import { DBDriverContract } from '../contracts/dbDriverContract';
import { IBillingPresenter } from '../presenters/helpers/interfaces/billing';

export class BillingRepository implements BillingRepositoryContract {
  constructor(private db: DBDriverContract<IBillingPresenter, any>) {}

  async create(billingEntity: Billing): Promise<object> {
    const billing = await this.db.create({
      name: billingEntity.name,
      amount: billingEntity.amount,
      dueDate: billingEntity.dueDate,
      status: billingEntity.status,
      totalNumberOfInstallments: billingEntity.totalNumberOfInstallments,
      totalOfInstallmentsPaid: billingEntity.totalOfInstallmentsPaid,
    });
    const presentation = new BillingPresenter(billing, ResponseTypes.JSON);
    return presentation.getBilling();
  }
}
