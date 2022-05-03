import { CreateBillingGroupUseCase } from '@/core/useCases/createBillingGroupUseCase'
import * as repositories from '@/adapters/repositories/factories/repositories.factory'
import { Billing } from '@/core/entities/Billing'
import { BillingStatus } from '@/helpers/interfaces/billingStatus'

const billingGroupRepository = repositories.BillingGroupingRepositoryFactory()
const useCase = new CreateBillingGroupUseCase(billingGroupRepository)

// Generate 10.000 random billing groupings
const billingsData = []
for (let i = 0; i < 10; i++) {
  billingsData.push(
    new Billing({
      name: `Pagamento ${i}`,
      dueDate: Date.now(),
      amount: parseFloat(`${(Math.random() * 100).toFixed(2)}`),
      status: BillingStatus.PENDING,
      totalNumberOfInstallments: 12,
      totalOfInstallmentsPaid: 0
    })
  )
}

for (let i = 0; i < 10000; i++) {
  useCase.execute({
    name: `Grupo de pagamento ${i}`,
    description: `Grupo de pagamento ${i}`,
    billings: billingsData
  })
  console.log(`Generating billing group ${i}`)
}
