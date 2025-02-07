import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Person } from '@prisma/client'
import { PeopleRepository } from '../repositories/people-repository'

interface GetPersonUseCaseRequest {
  cpf?: string
  id: string
}

interface GetPersonUseCaseResponse {
  person: Person
}

export class GetPersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    id,
  }: GetPersonUseCaseRequest): Promise<GetPersonUseCaseResponse> {
    const person = await this.peopleRepository.findById(id)

    if (!person) {
      throw new ResourceNotFoundError()
    }

    return {
      person,
    }
  }
}
