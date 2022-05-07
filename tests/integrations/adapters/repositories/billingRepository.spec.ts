import { Billing } from '@/core/entities/Billing';
import { IBilling } from '@/main/helpers/interfaces/entities';
import { BillingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';
import { BillingStatus } from '@/main/helpers/interfaces/billingStatus';

const billingData: IBilling = {
  name: 'Pagamento teste',
  dueDate: Date.now(),
  amount: 200.0,
  status: BillingStatus.PAID,
  totalNumberOfInstallments: 12,
  totalOfInstallmentsPaid: 0,
};

const billingRepository = BillingRepositoryFactory();

describe('Testa o repositório de billing', () => {
  it('Deve criar um billing', async () => {
    const billing = new Billing(billingData);
    const createdBilling = await billingRepository.create(billing);
    expect(createdBilling).toBeTruthy();
  });
});
