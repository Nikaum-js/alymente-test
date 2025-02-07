import { Person } from '@prisma/client'
import { PeopleRepository } from '../repositories/people-repository'

interface FetchPeopleUseCaseRequest {
  page: number
  perPage: number
}

interface FetchPeopleUseCaseResponse {
  people: Person[]
  totalCount: number
}

export class FetchPeopleUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    page,
    perPage,
  }: FetchPeopleUseCaseRequest): Promise<FetchPeopleUseCaseResponse> {
    const [people, totalCount] = await this.peopleRepository.findAll({
      page,
      perPage,
    })

    return {
      people,
      totalCount,
    }
  }
}
