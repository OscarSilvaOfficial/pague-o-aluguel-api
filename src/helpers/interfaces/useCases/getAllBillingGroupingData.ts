import { IBilling } from "../entities";

export interface GetAllBillingGroupingData {
  id?: number;
  name: string;
  description: string;
  billings?: IBilling[];
}