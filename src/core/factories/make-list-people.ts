import { PrismaPeopleRepository } from '@/domain/people/application/prisma/prisma-people-repository'
import { FetchPeopleUseCase } from '@/domain/people/application/use-cases/fetch-person'

export function makeFetchPeopleUseCase() {
  const peopleRepository = new PrismaPeopleRepository()
  const useCase = new FetchPeopleUseCase(peopleRepository)

  return useCase
}
