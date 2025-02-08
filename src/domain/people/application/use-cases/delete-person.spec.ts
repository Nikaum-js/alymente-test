// src/domain/people/use-cases/delete-person.spec.ts
import { PersonNotFoundError } from '@/core/errors/person-errors'
import { randomUUID } from 'node:crypto'
import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeletePersonUseCase } from './delete-person'

let peopleRepository: InMemoryPeopleRepository
let sut: DeletePersonUseCase

describe('Delete Person Use Case', () => {
  beforeEach(() => {
    peopleRepository = new InMemoryPeopleRepository()
    sut = new DeletePersonUseCase(peopleRepository)
  })

  it('should be able to delete a person', async () => {
    const createdPerson = await peopleRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      dateOfBirth: new Date('1990-01-01'),
      phone: '1234567890',
      address: '123 Main St',
      city: 'City',
      state: 'State',
      cpf: '123.456.789-00',
    })

    await sut.execute(createdPerson.id)

    expect(peopleRepository.items).toHaveLength(0)
  })

  it('should throw PersonNotFoundError if person does not exist', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toBeInstanceOf(
      PersonNotFoundError,
    )
  })
})
