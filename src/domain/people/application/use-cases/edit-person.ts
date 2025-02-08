import {
  PersonCpfAlreadyExistsError,
  PersonEmailAlreadyExistsError,
  PersonNotFoundError,
} from '@/core/errors/person-errors'
import { Person } from '@prisma/client'
import { PeopleRepository } from '../repositories/people-repository'

interface EditPersonUseCaseRequest {
  id: string
  name: string
  email: string
  cpf: string
  dateOfBirth: Date
  phone: string
  address: string
  city: string
  state: string
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
    cpf,
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

    if (email && email !== person.email) {
      const personWithSameEmail = await this.peopleRepository.findByEmail(email)

      if (personWithSameEmail) {
        throw new PersonEmailAlreadyExistsError()
      }
    }

    if (cpf && cpf !== person.cpf) {
      const personWithSameCpf = await this.peopleRepository.findByCpf(cpf)

      if (personWithSameCpf) {
        throw new PersonCpfAlreadyExistsError()
      }
    }

    const updatedPerson = await this.peopleRepository.update(id, {
      id,
      name,
      email,
      cpf,
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
