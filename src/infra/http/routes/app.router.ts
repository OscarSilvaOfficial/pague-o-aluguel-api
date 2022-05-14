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

@ApiTags('BillingGrouping')
@Router('/groups')
export class AppRouter {
  getAllBillingGroupingUseCase: GetAllBillingGroupingUseCase;

  constructor() {
    const repository = BillingGroupingRepositoryFactory();
    this.getAllBillingGroupingUseCase = new GetAllBillingGroupingUseCase(repository);
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
    return BillingGroupingPresenter.serializeResponseAPI(billingGroupings);
  }

  @Post('/')
  async createBillingGrouping(
    @Body() billing: BillingGroupingAPIRequest,
  ): Promise<BillingGroupingAPIResponse> {
    return billing;
  }
}
