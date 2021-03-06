import { Billing } from '@/core/entities/Billing';
import { NotRemaningInstallmentsError } from '@/main/helpers/interfaces/exceptions/billing.exceptions';
import { tomorrow, yesterday } from '@/main/helpers/days';
import { BillingStatus } from '@/main/helpers/interfaces/billingStatus';

const billingData = {
  name: 'Pagamento teste',
  dueDate: Date.now(),
  amount: 200.0,
  status: BillingStatus.PENDING,
  totalNumberOfInstallments: 12,
  totalOfInstallmentsPaid: 3,
};

describe('Billing unit tests', () => {
  it('Espera que a data de expiração seja hoje', () => {
    const billing = new Billing(billingData);
    expect(billing.daysToExpire()).toBe(0);
  });

  it('Espera que a data de expiração seja amanhã', () => {
    billingData.dueDate = tomorrow;
    const billing = new Billing(billingData);
    expect(billing.daysToExpire()).toBe(1);
  });

  it('Verifica se data já expirou', () => {
    const billing = new Billing(billingData);
    expect(billing.isExpired()).toBe(false);
  });

  it('Verifica data já expirada', () => {
    billingData.dueDate = yesterday;
    const billing = new Billing(billingData);
    expect(billing.isExpired()).toBe(true);
  });

  it('Verifica se conta não foi paga', () => {
    const billing = new Billing(billingData);
    expect(billing.isPaid()).toBe(false);
  });

  it('Verifica conta foi paga', () => {
    billingData.status = BillingStatus.PAID;
    const billing = new Billing(billingData);
    expect(billing.isPaid()).toBe(true);
  });

  it('Verifica a quantidade de contas a pagar', () => {
    const billing = new Billing(billingData);
    expect(billing.remainingInstallments()).toBe(9);
  });

  it('Lança erro caso tente ser feito a verificação de parcelas em um pagamento fixo', () => {
    billingData.totalNumberOfInstallments = 0;
    const billing = new Billing(billingData);
    try {
      billing.remainingInstallments();
      throw new Error();
    } catch (error) {
      expect(error).toBeInstanceOf(NotRemaningInstallmentsError);
    }
  });
});
