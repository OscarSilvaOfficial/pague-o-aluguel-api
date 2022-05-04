import { IBilling } from "../entities";

export interface BillingGroupingData {
  id?: number;
  name: string;
  description: string;
  billings?: IBilling[];
}