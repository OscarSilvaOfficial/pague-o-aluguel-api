import { Billing } from '@/core/entities/Billing';
import {
  BillingPresenter,
  ResponseTypes,
} from '@/presenters/billing.presenter';
import { BillingRepositoryContract } from '../contracts/billingRepositoryContract';
import { DBDriverContract } from '../contracts/dbDriverContract';

export class BillingRepository implements BillingRepositoryContract {
  constructor(private db: DBDriverContract) {}

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
