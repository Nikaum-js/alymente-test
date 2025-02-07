import {
  PersonCpfAlreadyExistsError,
  PersonEmailAlreadyExistsError,
} from '@/core/errors/person-errors'
import { Person } from '@prisma/client'
import { PeopleRepository } from '../repositories/people-repository'

interface RegisterPersonUseCaseRequest {
  name: string
  email: string
  dateOfBirth: Date | string
  cpf: string
  phone?: string
  address?: string
  city: string
  state: string
}

interface RegisterPersonUseCaseResponse {
  person: Person
}

export class RegisterPersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute({
    address,
    city,
    cpf,
    dateOfBirth,
    email,
    name,
    phone,
    state,
  }: RegisterPersonUseCaseRequest): Promise<RegisterPersonUseCaseResponse> {
    const personWithSameEmail = await this.peopleRepository.findByEmail(email)
    const personWithSameCpf = await this.peopleRepository.findByCpf(cpf)

    if (personWithSameEmail) {
      throw new PersonEmailAlreadyExistsError()
    }

    if (personWithSameCpf) {
      throw new PersonCpfAlreadyExistsError()
    }

    const person = await this.peopleRepository.create({
      address,
      city,
      cpf,
      dateOfBirth,
      email,
      name,
      phone,
      state,
    })

    return {
      person,
    }
  }
}
