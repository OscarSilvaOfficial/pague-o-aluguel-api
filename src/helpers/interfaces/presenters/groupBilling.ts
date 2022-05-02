import { ICreateBillingGroupData } from "../useCases/createBillingGroupData";

export interface GroupBillingDatabaseForm extends ICreateBillingGroupData {
  id?: number;
}
