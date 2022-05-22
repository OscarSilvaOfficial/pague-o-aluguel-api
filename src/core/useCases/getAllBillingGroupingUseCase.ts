import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { GroupBillingDatabaseForm } from '@/main/helpers/interfaces/presenters/groupBilling';
import { GetAllBillingGroupingUseCaseResponse } from '@/main/helpers/interfaces/useCases/getAllBillingGroupingUseCase';
import { GetAllBillingGroupingUseCaseOptions } from '@/main/helpers/interfaces/useCases/getAllBillingGroupingUseCaseOptions';

export class GetAllBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  async execute(options: GetAllBillingGroupingUseCaseOptions): Promise<GetAllBillingGroupingUseCaseResponse[]> {
    return await this.billingGroupRepository.all(options.withBillings);
  }
}
