import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { GroupBillingDatabaseForm } from '@/main/helpers/interfaces/presenters/groupBilling';
import { GetAllBillingGroupingUseCaseOptions } from '@/main/helpers/interfaces/useCases/getAllBillingGroupingUseCaseOptions';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';

export class GetAllBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  async execute(options: GetAllBillingGroupingUseCaseOptions): Promise<BillingGrouping[]> {
    const response = await this.billingGroupRepository.all(options.withBillings);
    return response.map(billingGrouping => new BillingGrouping({
      name: billingGrouping.name,
      description: billingGrouping.description,
      billings: billingGrouping.billings ? billingGrouping.billings.map(billing => new Billing(billing)) : null,
    }));
  }
}
