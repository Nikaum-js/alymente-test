import { PrismaPeopleRepository } from '@/domain/people/application/prisma/prisma-people-repository'
import { GetPersonUseCase } from '@/domain/people/application/use-cases/get-person'

export function makeGetPersonUseCase() {
  const peopleRepository = new PrismaPeopleRepository()
  const getPersonUseCase = new GetPersonUseCase(peopleRepository)

  return getPersonUseCase
}
