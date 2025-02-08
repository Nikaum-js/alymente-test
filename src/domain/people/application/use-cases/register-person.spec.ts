import { PersonEmailAlreadyExistsError } from '@/core/errors/person-errors'
import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPersonUseCase } from './register-person'

let peopleRepository: InMemoryPeopleRepository
let stu: RegisterPersonUseCase

describe('Register Person UseCase', () => {
  beforeEach(() => {
    peopleRepository = new InMemoryPeopleRepository()
    stu = new RegisterPersonUseCase(peopleRepository)
  })

  it('should successfully register a new person', async () => {
    const personData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'City',
      cpf: '123.456.789-00',
      phone: '(12) 91456-7890',
      state: 'State',
      dateOfBirth: new Date('2003-08-21'),
    }

    const { person } = await stu.execute(personData)

    await expect(person).toEqual({
      id: 'person-1',
      ...personData,
    })
  })
  it('should not be able to register with same email twice', async () => {
    const personData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'City',
      cpf: '123.456.789-00',
      phone: '(12) 91456-7890',
      state: 'State',
      dateOfBirth: new Date('2003-08-21'),
    }

    await stu.execute(personData)

    await expect(stu.execute(personData)).rejects.toThrowError(
      PersonEmailAlreadyExistsError,
    )
  })
})
