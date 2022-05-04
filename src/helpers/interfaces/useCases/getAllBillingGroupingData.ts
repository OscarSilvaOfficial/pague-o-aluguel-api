import { IBilling } from "../entities";

export interface AllBillingGroupingData {
  id?: number;
  name: string;
  description: string;
  billings?: IBilling[];
}