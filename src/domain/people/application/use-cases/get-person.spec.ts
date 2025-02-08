import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { randomUUID } from 'node:crypto'
import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPersonUseCase } from './get-person'

let peopleRepository: InMemoryPeopleRepository
let stu: GetPersonUseCase

describe('Get Person Use Case', () => {
  beforeEach(() => {
    peopleRepository = new InMemoryPeopleRepository()
    stu = new GetPersonUseCase(peopleRepository)
  })
  it('should be able to get person', async () => {
    const createdPerson = await peopleRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'City',
      cpf: '123.456.789-00',
      phone: '(12) 91456-7890',
      state: 'State',
      dateOfBirth: new Date('2003-08-21'),
    })

    const { person } = await stu.execute({
      id: createdPerson.id,
    })

    expect(person.name).toEqual('John Doe')
    expect(person.cpf).toEqual('123.456.789-00')
  })
  it('should not be able to get person with wrong id', async () => {
    expect(() =>
      stu.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to get person with wrong CPF', async () => {
    expect(() =>
      stu.execute({
        cpf: 'non-existing-cpf',
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
