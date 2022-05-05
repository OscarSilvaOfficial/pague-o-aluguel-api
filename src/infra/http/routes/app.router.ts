import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { BillingGroupingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase';
import { BillingGroupingAPIResponse } from '@/helpers/interfaces/infra/billingGroupingAPIResponse';

import { Controller as Router, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BillingGrouping') 
@Router()
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase

  constructor() {
    const repository = BillingGroupingRepositoryFactory()
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository)
  }

  @Get('/groups')
  async getAllBillingGroupings(@Query('billings') billings: boolean): Promise<BillingGroupingAPIResponse[]> { 
    const withBillings = billings || false
    const billingGroupings = await this.getAllBillingGroupingUseCase.execute({ withBillings });
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }
}
