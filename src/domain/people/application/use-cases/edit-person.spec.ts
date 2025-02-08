import { PersonNotFoundError } from '@/core/errors/person-errors'
import { randomUUID } from 'node:crypto'
import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditPersonUseCase } from './edit-person'

let peopleRepository: InMemoryPeopleRepository
let sut: EditPersonUseCase

describe('Edit Person Use Case', () => {
  beforeEach(() => {
    peopleRepository = new InMemoryPeopleRepository()
    sut = new EditPersonUseCase(peopleRepository)
  })

  it('should be able to edit a person', async () => {
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

    const { person } = await sut.execute({
      id: createdPerson.id,
      name: 'John Doe Updated',
      cpf: '122.285.060-52',
      email: 'johndoeupdated@example.com',
      dateOfBirth: new Date('1990-01-02'),
      phone: '0987654321',
      address: '456 Updated St',
      city: 'Updated City',
      state: 'Updated State',
    })

    expect(person).toMatchObject({
      name: 'John Doe Updated',
      email: 'johndoeupdated@example.com',
      dateOfBirth: new Date('1990-01-02'),
      phone: '0987654321',
      address: '456 Updated St',
      city: 'Updated City',
      state: 'Updated State',
    })
  })

  it('should throw PersonNotFoundError if person does not exist', async () => {
    return await expect(
      sut.execute({
        id: 'non-existing-id',
        name: 'John Doe Updated',
        email: 'johndoeupdated@example.com',
        dateOfBirth: new Date('1990-01-02'),
        phone: '0987654321',
        address: '456 Updated St',
        city: 'Updated City',
        state: 'Updated State',
        cpf: '122.285.060-52',
      }),
    ).rejects.toBeInstanceOf(PersonNotFoundError)
  })
})
