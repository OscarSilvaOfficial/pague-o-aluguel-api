import { Billing } from '@/core/entities/Billing';
import { IBilling } from '@/helpers/interfaces/entities';
import { BillingRepositoryContract } from '../contracts/billingRepositoryContract';
import { DBDriverContract } from '../contracts/dbDriverContract';

export class BillingRepository implements BillingRepositoryContract {
  constructor(private db: DBDriverContract<IBilling>) {}

  async create(billingEntity: Billing): Promise<Billing> {
    const billing = await this.db.create(billingEntity);
    return new Billing(billing);
  }
}
