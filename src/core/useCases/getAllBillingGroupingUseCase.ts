import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';
import { GetAllBillingGroupingData } from '@/helpers/interfaces/useCases/getAllBillingGroupingData';

export class GetAllBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  async execute(billings: boolean): Promise<GetAllBillingGroupingData[]> {
    const billingGroupings = await this.billingGroupRepository.all(billings);
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }
}
