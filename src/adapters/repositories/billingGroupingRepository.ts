import { DBDriverContract } from '../contracts/dbDriverContract';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';
import { BillingGroupRepositoryContract } from '../contracts/billingGroupRepositoryContract';
import { BillingGrouping } from '@/core/entities/BillingGrouping';
import { BillingGroupingPresenter } from '../presenters/billingGrouping.presenter';
import { ResponseTypes } from '@/helpers/interfaces/presenters/response.types';

export class BillingGroupingRepository implements BillingGroupRepositoryContract<GroupBillingDatabaseForm> {
  constructor(private db: DBDriverContract<GroupBillingDatabaseForm, any>) {}

  async all(): Promise<GroupBillingDatabaseForm[]> {
    return await this.db.getAll();
  }

  async create(entity: BillingGrouping): Promise<GroupBillingDatabaseForm> {
    const billingGroupingDatabaseForm = BillingGroupingPresenter.convertBillingGroupingEntityToDatabaseResponse(entity);
    const billing = await this.db.create(billingGroupingDatabaseForm, {
      include: {
        billings: true
      }
    });
    const presentation = new BillingGroupingPresenter(billing, ResponseTypes.JSON);
    return presentation.getBilling();
  }
}
