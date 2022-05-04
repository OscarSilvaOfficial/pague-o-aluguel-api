import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { BillingGroupingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase';
import { BillingGroupingData } from '@/helpers/interfaces/useCases/billingGroupingData';

import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase

  constructor() {
    const repository = BillingGroupingRepositoryFactory()
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository)
  }

  @Get('/groups')
  async getAllBillingGroupings(@Query('billings') billings: boolean = false): Promise<BillingGroupingData[]> {  
    const billingGroupings = await this.getAllBillingGroupingUseCase.execute({ withBillings: billings });
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }
}
