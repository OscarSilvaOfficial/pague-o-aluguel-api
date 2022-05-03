import { BillingGroupingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase

  constructor() {
    const repository = BillingGroupingRepositoryFactory()
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository)
  }

  @Get('/groups')
  async getAllBillingGroupings() {  
    return await this.getAllBillingGroupingUseCase.execute(false);
  }
}
