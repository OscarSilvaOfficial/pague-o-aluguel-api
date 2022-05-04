import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { BillingGroupingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase';
import { GetAllBillingGroupingData } from '@/helpers/interfaces/useCases/getAllBillingGroupingData';

import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase

  constructor() {
    const repository = BillingGroupingRepositoryFactory()
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository)
  }

  @Get('/groups')
  async getAllBillingGroupings(@Query('billings') billings: boolean = false): Promise<GetAllBillingGroupingData[]> {  
    const billingGroupings = await this.getAllBillingGroupingUseCase.execute({ withBillings: billings });
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }
}
