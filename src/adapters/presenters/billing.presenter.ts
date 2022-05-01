import { IBillingPresenter } from './helpers/interfaces/billing';

export enum ResponseTypes {
  JSON,
}

export class BillingPresenter {
  constructor(
    private billing: IBillingPresenter,
    private responseType: ResponseTypes,
  ) {}

  private jsonResponse(): IBillingPresenter {
    return this.billing;
  }

  getBilling() {
    return {
      [ResponseTypes.JSON]: this.jsonResponse(),
    }[this.responseType];
  }
}
