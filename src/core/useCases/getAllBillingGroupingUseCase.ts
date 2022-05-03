import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';

export class GetAllBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  async execute(): Promise<GroupBillingDatabaseForm[]> {
    return await this.billingGroupRepository.all();
  }
}
