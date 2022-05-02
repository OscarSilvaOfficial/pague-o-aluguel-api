import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { BillingRepositoryContract } from '@/adapters/contracts/billingRepositoryContract';
import { BillingDatabaseForm } from '@/helpers/interfaces/presenters/billing';
import { GroupBillingDatabaseForm } from '@/helpers/interfaces/presenters/groupBilling';
import { ICreateBillingData } from '@/helpers/interfaces/useCases/createBillingData';
import { ICreateBillingGroupData } from '@/helpers/interfaces/useCases/createBillingGroupData';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';

export class createBillingGroupUseCase {
  constructor(
    private billingRepository: BillingRepositoryContract<BillingDatabaseForm>,
    private billingGroupRepository: BillingGroupRepositoryContract<GroupBillingDatabaseForm>,
  ) {}

  private async createBillingsOfGroup(
    billingsData: ICreateBillingData[],
  ): Promise<Billing[]> {
    const response = billingsData.map(async (billingData) => {
      const billing = new Billing(billingData);
      const createdBilling = await this.billingRepository.create(billing);
      return new Billing(createdBilling);
    });
    return await Promise.all(response);
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

    const createdBillingGrouping = await this.billingGroupRepository.create(
      billingGrouping,
    );

    return new BillingGrouping({
      name: createdBillingGrouping.name,
      description: createdBillingGrouping.description,
      billings: createdBillingGrouping.billings.map(billing => {
        return new Billing(billing);
      }),
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
    if (billingGroupingData.billings.length > 0)
      return await this.createBillingGroupWithBillings(billingGroupingData);

    return await this.createBillingGroupWithNoBillings(billingGroupingData);
  }
}
