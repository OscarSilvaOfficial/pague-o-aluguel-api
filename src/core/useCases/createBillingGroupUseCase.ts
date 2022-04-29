import { BillingGroupRepositoryContract } from '@/adapters/repositories/contracts/billingGroupRepositoryContract';
import { BillingRepositoryContract } from '@/adapters/repositories/contracts/billingRepositoryContract';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';
import { ICreateBillingData } from './helpers/interfaces/createBillingData';
import { ICreateBillingGroupData } from './helpers/interfaces/createBillingGroupData';

export class createBillingGroupUseCase {
  constructor(
    private billingRepository: BillingRepositoryContract,
    private billingGroupRepository: BillingGroupRepositoryContract,
  ) {}

  private async createBillingsOfGroup(
    billingsData: ICreateBillingData[],
  ): Promise<Billing[]> {
    const billings: Billing[] = [];
    for (const billingData of billingsData) {
      const billing = new Billing(billingData);
      const createdBilling = await this.billingRepository.create(billing);
      billings.push(createdBilling);
    }
    return billings;
  }

  private async createBillingGroupWithBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    const billings = await this.createBillingsOfGroup(
      billingGroupingData.billings,
    );
    const billingGrouping = new BillingGrouping({
      name: billingGroupingData.name,
      description: billingGroupingData.description,
      billings: billings,
    });
    return await this.billingGroupRepository.create(billingGrouping);
  }

  private async createBillingGroupWithNoBillings(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    return await this.billingGroupRepository.create(
      new BillingGrouping({
        name: billingGroupingData.name,
        description: billingGroupingData.description,
      }),
    );
  }

  async execute(
    billingGroupingData: ICreateBillingGroupData,
  ): Promise<BillingGrouping> {
    if (billingGroupingData.billings.length > 0)
      return await this.createBillingGroupWithBillings(billingGroupingData);

    return await this.createBillingGroupWithNoBillings(billingGroupingData);
  }
}
