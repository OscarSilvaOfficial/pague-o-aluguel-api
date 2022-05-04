import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';
import { ICreateBillingGroupData } from '@/helpers/interfaces/useCases/createBillingGroupData';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';

export class CreateBillingGroupUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  private async createBillingGroupWithBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    const billingGrouping = new BillingGrouping({
      name: billingGroupingData.name,
      description: billingGroupingData.description,
      billings: billingGroupingData.billings.map(billing => new Billing(billing)),
    });

    const createdBillingGrouping = await this.billingGroupRepository.create(
      billingGrouping,
    );

    return new BillingGrouping({
      name: createdBillingGrouping.name,
      description: createdBillingGrouping.description,
      billings: createdBillingGrouping.billings.map(billing => new Billing(billing)),
    });
  }

  private async createBillingGroupWithNoBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    const billingGrouping = new BillingGrouping({
      name: billingGroupingData.name,
      description: billingGroupingData.description,
    })
    const createBillingGrouping = await this.billingGroupRepository.create(billingGrouping);
    return new BillingGrouping({
      name: createBillingGrouping.name,
      description: createBillingGrouping.description,
    });
  }

  async execute(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    return billingGroupingData.billings ?
      await this.createBillingGroupWithBillings(billingGroupingData) : 
      await this.createBillingGroupWithNoBillings(billingGroupingData)
  }
}
