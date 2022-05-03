import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';

export class GetAllBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  async execute(): Promise<GroupBillingDatabaseForm[]> {
    const billingGroupings = await this.billingGroupRepository.all();
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }
}
