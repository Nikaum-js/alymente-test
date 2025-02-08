import { PeopleRepository } from '@/domain/people/application/repositories/people-repository'
import { Person } from '@/domain/people/enterprise/entities/Person'

export class InMemoryPeopleRepository implements PeopleRepository {
  async update(id: string, data: Partial<Person>): Promise<Person> {
    const personIndex = this.items.findIndex((item) => item.id === id)

    if (personIndex === -1) {
      throw new Error('Person not found')
    }

    const updatedPerson: Person = {
      ...this.items[personIndex],
      ...data,
    }

    this.items[personIndex] = updatedPerson

    return updatedPerson
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((person) => person.id === id)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  async findAll(params: {
    page: number
    perPage: number
  }): Promise<[Person[], number]> {
    const { page, perPage } = params
    const skip = (page - 1) * perPage
    const take = perPage

    const people = this.items.slice(skip, skip + take)
    const totalCount = this.items.length

    return [people, totalCount]
  }

  async findByCpf(cpf: string): Promise<Person | null> {
    const person = this.items.find((item) => item.cpf === cpf)

    if (!person) {
      return null
    }

    return person
  }

  public items: Person[] = []

  async create(data: Person) {
    const person = {
      id: 'person-1',
      address: data.address ?? null,
      phone: data.phone ?? null,
      city: data.city,
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      state: data.state,
      dateOfBirth: new Date(data.dateOfBirth),
    }

    this.items.push(person)

    return person
  }

  async findById(id: string) {
    const person = this.items.find((item) => item.id === id)
    if (!person) {
      return null
    }
    return person
  }

  async findByEmail(email: string) {
    const person = this.items.find((item) => item.email === email)

    if (!person) {
      return null
    }

    return person
  }
}
