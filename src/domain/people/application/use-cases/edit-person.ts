import { PersonNotFoundError } from '@/core/errors/person-errors'
import { Person } from '@prisma/client'
import { PeopleRepository } from '../repositories/people-repository'

interface EditPersonUseCaseRequest {
  id: string
  name?: string
  email?: string
  dateOfBirth?: Date
  phone?: string
  address?: string
  city?: string
  state?: string
}

interface EditPersonUseCaseResponse {
  person: Person
}

export class EditPersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    id,
    name,
    email,
    dateOfBirth,
    phone,
    address,
    city,
    state,
  }: EditPersonUseCaseRequest): Promise<EditPersonUseCaseResponse> {
    const person = await this.peopleRepository.findById(id)

    if (!person) {
      throw new PersonNotFoundError()
    }

    const updatedPerson = await this.peopleRepository.update(id, {
      name,
      email,
      dateOfBirth,
      phone,
      address,
      city,
      state,
    })

    return {
      person: updatedPerson,
    }
  }
}
