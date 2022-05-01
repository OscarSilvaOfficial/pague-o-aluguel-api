import { Billing } from '@/core/entities/Billing';
import {
  BillingPresenter,
  ResponseTypes,
} from '@/adapters/presenters/billing.presenter';
import { BillingRepositoryContract } from '../contracts/billingRepositoryContract';
import { DBDriverContract } from '../contracts/dbDriverContract';
import { BillingDatabaseForm } from '../../helpers/interfaces/presenters/billing';

export class BillingRepository implements BillingRepositoryContract {
  constructor(private db: DBDriverContract<BillingDatabaseForm, any>) {}

  async create(billingEntity: Billing): Promise<BillingDatabaseForm> {
    const billingDatabaseForm = BillingPresenter.convertBillingEntityToDatabaseResponse(billingEntity);
    const billing = await this.db.create(billingDatabaseForm);
    const presentation = new BillingPresenter(billing, ResponseTypes.JSON);
    return presentation.getBilling();
  }
}
