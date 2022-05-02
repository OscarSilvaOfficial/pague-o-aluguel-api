import { Billing } from '@/core/entities/Billing';
import { BillingPresenter } from '@/adapters/presenters/billing.presenter';
import { BillingRepositoryContract } from '../contracts/billingRepositoryContract';
import { DBDriverContract } from '../contracts/dbDriverContract';
import { BillingDatabaseForm } from '../../helpers/interfaces/presenters/billing';
import { ResponseTypes } from '@/helpers/interfaces/presenters/response.types';

export class BillingRepository implements BillingRepositoryContract<BillingDatabaseForm> {
  constructor(private db: DBDriverContract<BillingDatabaseForm, any>) {}

  async create(billingEntity: Billing): Promise<BillingDatabaseForm> {
    const billingDatabaseForm = BillingPresenter.convertBillingEntityToDatabaseResponse(billingEntity);
    const billing = await this.db.create(billingDatabaseForm, {});
    const presentation = new BillingPresenter(billing, ResponseTypes.JSON);
    return presentation.getBilling();
  }
}
