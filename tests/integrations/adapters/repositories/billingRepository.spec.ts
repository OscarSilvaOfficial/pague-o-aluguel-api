import { Billing } from '@/core/entities/Billing';
import { BillingStatus } from '@/core/helpers/interfaces/billingStatus';
import { IBilling } from '@/helpers/interfaces/entities';
import { BillingRepositoryFactory } from '@/adapters/repositories/factories/repositories.factory';

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