import { Person, Prisma } from '@prisma/client'

export interface PeopleRepository {
  create(data: Prisma.PersonCreateInput): Promise<Person>
  findByEmail(email: string): Promise<Person | null>
  findById(id: string): Promise<Person | null>
  findByCpf(cpf: string): Promise<Person | null>
  update(id: string, data: Prisma.PersonUpdateInput): Promise<Person>
  delete(id: string): Promise<void>
  findAll(params: {
    page: number
    perPage: number
  }): Promise<[Person[], number]>
}
