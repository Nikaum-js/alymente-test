import { Person } from '../../enterprise/entities/Person'

export interface PeopleRepository {
  create(data: Person): Promise<Person>
  findByEmail(email: string): Promise<Person | null>
  findById(id: string): Promise<Person | null>
  findByCpf(cpf: string): Promise<Person | null>
  update(id: string, data: Person): Promise<Person>
  delete(id: string): Promise<void>
  findAll(params: {
    page: number
    perPage: number
  }): Promise<[Person[], number]>
}
