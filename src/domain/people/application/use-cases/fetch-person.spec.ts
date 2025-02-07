import { InMemoryPeopleRepository } from 'test/repositories/in-memory-people-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPeopleUseCase } from './fetch-person'

let peopleRepository: InMemoryPeopleRepository
let sut: FetchPeopleUseCase

describe('Fetch People Use Case', () => {
  beforeEach(() => {
    peopleRepository = new InMemoryPeopleRepository()
    sut = new FetchPeopleUseCase(peopleRepository)
  })

  it('should be able to fetch paginated people', async () => {
    for (let i = 1; i <= 22; i++) {
      await peopleRepository.create({
        name: `Person ${i}`,
        email: `person${i}@example.com`,
        address: `Address ${i}`,
        city: 'City',
        cpf: `${i}`.padStart(11, '0'),
        phone: `(12) 9${i}`.padEnd(13, '0'),
        state: 'State',
        dateOfBirth: new Date(`2000-01-${i}`),
      })
    }

    const { people, totalCount } = await sut.execute({
      page: 2,
      perPage: 10,
    })

    expect(people).toHaveLength(10)
    expect(people[0].name).toEqual('Person 11')
    expect(people[9].name).toEqual('Person 20')
    expect(totalCount).toEqual(22)
  })

  it('should be able to fetch paginated people with different page and perPage values', async () => {
    for (let i = 1; i <= 5; i++) {
      await peopleRepository.create({
        name: `Person ${i}`,
        email: `person${i}@example.com`,
        address: `Address ${i}`,
        city: 'City',
        cpf: `${i}`.padStart(11, '0'),
        phone: `(12) 9${i}`.padEnd(13, '0'),
        state: 'State',
        dateOfBirth: new Date(`2000-01-${i}`),
      })
    }

    const { people, totalCount } = await sut.execute({
      page: 1,
      perPage: 3,
    })

    expect(people).toHaveLength(3)
    expect(people[0].name).toEqual('Person 1')
    expect(people[2].name).toEqual('Person 3')
    expect(totalCount).toEqual(5)
  })

  it('should be able to fetch paginated people when there are no people registered', async () => {
    const { people, totalCount } = await sut.execute({
      page: 1,
      perPage: 10,
    })

    expect(people).toHaveLength(0)
    expect(totalCount).toEqual(0)
  })
})
