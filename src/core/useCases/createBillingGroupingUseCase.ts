import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { GroupBillingDatabaseForm } from '@/main/helpers/interfaces/presenters/groupBilling';
import { ICreateBillingGroupData } from '@/main/helpers/interfaces/useCases/createBillingGroupData';
import { CreateBillingGroupingUseCaseResponse } from '@/main/helpers/interfaces/useCases/createBillingGroupingUseCase';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';

export class CreateBillingGroupingUseCase {
  constructor(
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  private async createBillingGroupWithBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<CreateBillingGroupingUseCaseResponse> {
    
    const billingGrouping = new BillingGrouping({
      name: billingGroupingData.name,
      description: billingGroupingData.description,
      billings: billingGroupingData.billings.map(billing => new Billing(billing)),
    });

    return await this.billingGroupRepository.create(billingGrouping);
  }

  private async createBillingGroupWithNoBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<CreateBillingGroupingUseCaseResponse> {

    const billingGrouping = new BillingGrouping({
      name: billingGroupingData.name,
      description: billingGroupingData.description,
    })

    return await this.billingGroupRepository.create(billingGrouping);
  }

  async execute(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<CreateBillingGroupingUseCaseResponse> {
    return billingGroupingData.billings ?
      await this.createBillingGroupWithBillings(billingGroupingData) : 
      await this.createBillingGroupWithNoBillings(billingGroupingData)
  }
}
