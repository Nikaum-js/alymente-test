import { PrismaPeopleRepository } from '@/domain/people/application/prisma/prisma-people-repository'
import { RegisterPersonUseCase } from '@/domain/people/application/use-cases/register-person'

export function makeRegisterPersonUseCase() {
  const peopleRepository = new PrismaPeopleRepository()
  const registerPersonUseCase = new RegisterPersonUseCase(peopleRepository)

  return registerPersonUseCase
}
