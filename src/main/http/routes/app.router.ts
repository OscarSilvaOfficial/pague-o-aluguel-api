import { BillingGroupingPresenter } from '@/adapters/presenters/billingGrouping.presenter';
import { BillingGroupingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase';
import { BillingGroupingAPIResponse } from '@/main/helpers/interfaces/infra/billingGroupingAPIResponse';
import * as DOCS from '@/main/helpers/docs/swagger/api.docs';

import {
  Body,
  Controller as Router,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BillingGroupingAPIRequest } from '@/main/helpers/validators/request/billingGroupingAPIRequest';
import { CreateBillingGroupingUseCase } from '@/core/useCases/createBillingGroupingUseCase';

@ApiTags('BillingGrouping')
@Router('/groups')
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase;
  createBillingGroupingUseCase: CreateBillingGroupingUseCase;

  constructor() {
    const repository = BillingGroupingRepositoryFactory();
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository);
    this.createBillingGroupingUseCase = new CreateBillingGroupingUseCase(repository);
  }

  @ApiOkResponse(DOCS.getAllBillingGroupings.OK)
  @ApiNotFoundResponse(DOCS.getAllBillingGroupings.NotFound)
  @Get('/')
  async getAllBillingGroupings(
    @Query('billings') billings: boolean,
  ): Promise<BillingGroupingAPIResponse[]> {
    const withBillings = billings || false;
    const billingGroupings = await this.getAllBillingGroupingUseCase.execute({
      withBillings,
    });
    return BillingGroupingPresenter.getAllBillingGroupingsResponseAPI(billingGroupings);
  }

  @ApiOkResponse(DOCS.createBillingGrouping.OK)
  @Post('/')
  async createBillingGrouping(
    @Body() billing: BillingGroupingAPIRequest,
  ): Promise<BillingGroupingAPIResponse> {
    const billingGrouping = await this.createBillingGroupingUseCase.execute(billing);
    return BillingGroupingPresenter.createGroupBillingResponseAPI(billingGrouping);
  }
}
