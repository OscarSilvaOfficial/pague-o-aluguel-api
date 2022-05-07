import { CreateBillingGroupUseCase } from '@/core/useCases/createBillingGroupUseCase'
import * as repositories from '@/adapters/repositories/factories/repositories.factory'
import { Billing } from '@/core/entities/Billing'
import { BillingStatus } from '@/main/helpers/interfaces/billingStatus'

const billingGroupRepository = repositories.BillingGroupingRepositoryFactory()
const useCase = new CreateBillingGroupUseCase(billingGroupRepository)

describe("Teste dos casos de uso para criação de grupo de pagamento", () => {

  it("Deve criar um grupo de pagamento com pagamento", async () => {
    const billingsData = [
      new Billing({
        name: "Pagamento 1",
        dueDate: Date.now(),
        amount: 100.11,
        status: BillingStatus.PENDING,
        totalNumberOfInstallments: 12,
        totalOfInstallmentsPaid: 0
      }),
      new Billing({
        name: "Pagamento 2",
        dueDate: Date.now(),
        amount: 100.12,
        status: BillingStatus.PENDING,
        totalNumberOfInstallments: 11,
        totalOfInstallmentsPaid: 0
      }),
    ]

    const billingGroupingData = {
      name: "Grupo de pagamento 2",
      description: "Grupo de pagamento 2",
      billings: billingsData
    };

    const response = await useCase.execute(billingGroupingData)

    expect(response.name).toBe(billingGroupingData.name)
  })

})