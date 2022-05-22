import { BillingGrouping } from '@/core/entities/BillingGrouping';
import { ApiResponseOptions } from '@nestjs/swagger';

export const getAllBillingGroupings = {
  OK: {
    description: 'Get all billing groupings',
    type: BillingGrouping,
    isArray: true,
  } as ApiResponseOptions,
  NotFound: {
    description: 'Billing groupings not found',
    status: 404,
  } as ApiResponseOptions
}

export const createBillingGrouping = {
  OK: {
    description: 'create a billing groupings',
    type: BillingGrouping,
    isArray: false,
  } as ApiResponseOptions
}