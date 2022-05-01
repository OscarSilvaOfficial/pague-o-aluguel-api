import { ICreateBillingData } from './createBillingData';

export interface ICreateBillingGroupData {
  name: string;
  description: string;
  billings?: ICreateBillingData[];
}
