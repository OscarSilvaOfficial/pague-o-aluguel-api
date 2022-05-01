import { BillingGroupRepositoryContract } from '@/adapters/contracts/billingGroupRepositoryContract';
import { BillingRepositoryContract } from '@/adapters/contracts/billingRepositoryContract';
import { ICreateBillingData } from '@/helpers/interfaces/useCases/createBillingData';
import { ICreateBillingGroupData } from '@/helpers/interfaces/useCases/createBillingGroupData';
import { Billing } from '../entities/Billing';
import { BillingGrouping } from '../entities/BillingGrouping';

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
      const createdBilling: any = await this.billingRepository.create(billing);
      const billingEntity = new Billing({
        name: createdBilling.name,
        amount: createdBilling.amount,
        dueDate: createdBilling.dueDate,
        status: createdBilling.status,
        totalNumberOfInstallments: createdBilling.totalNumberOfInstallments,
        totalOfInstallmentsPaid: createdBilling.totalOfInstallmentsPaid,
      });
      billings.push(billingEntity);
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
