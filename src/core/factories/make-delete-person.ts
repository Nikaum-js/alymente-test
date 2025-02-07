import { PrismaPeopleRepository } from '@/domain/people/application/prisma/prisma-people-repository'
import { DeletePersonUseCase } from '@/domain/people/application/use-cases/delete-person'

export function makeDeletePersonUseCase() {
  const peopleRepository = new PrismaPeopleRepository()
  const useCase = new DeletePersonUseCase(peopleRepository)

  return useCase
}
