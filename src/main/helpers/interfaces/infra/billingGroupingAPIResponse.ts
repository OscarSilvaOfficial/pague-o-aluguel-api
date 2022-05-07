import { IBilling } from "../entities";

export interface BillingGroupingAPIResponse {
  id?: number;
  name: string;
  description: string;
  billings?: IBilling[];
}