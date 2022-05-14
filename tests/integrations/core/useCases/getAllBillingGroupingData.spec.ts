import * as repositories from '@/adapters/repositories/factories/repositories.factory'
import { GetAllBillingGroupingUseCase } from '@/core/useCases/getAllBillingGroupingUseCase'

const billingGroupRepository = repositories.BillingGroupingRepositoryFactory()
const useCase = new GetAllBillingGroupingUseCase(billingGroupRepository)

describe("Teste dos casos de uso para para pegar os grupos de pagamento", () => {
  
  it("Deve pegar todos os grupos de pagamento", async () => {
    const response = await useCase.execute({})
    expect(response).toBeTruthy()
  })
})