import { Person } from '../../enterprise/entities/Person'
import { PeopleRepository } from '../repositories/people-repository'

import { prisma } from '@/lib/prisma'

export class PrismaPeopleRepository implements PeopleRepository {
  async findByEmail(email: string) {
    const person = await prisma.person.findUnique({
      where: {
        email,
      },
    })

    return person
  }

  async update(id: string, data: Person): Promise<Person> {
    const person = await prisma.person.update({
      where: { id },
      data,
    })

    return person
  }

  async delete(id: string): Promise<void> {
    await prisma.person.delete({
      where: {
        id,
      },
    })
  }

  async findAll({
    page,
    perPage,
  }: {
    page: number
    perPage: number
  }): Promise<[Person[], number]> {
    const skip = (page - 1) * perPage
    const take = perPage

    const [people, totalCount] = await prisma.$transaction([
      prisma.person.findMany({
        skip,
        take,
      }),
      prisma.person.count(),
    ])

    return [people, totalCount]
  }

  async findByCpf(cpf: string) {
    const person = await prisma.person.findUnique({
      where: {
        cpf,
      },
    })

    return person
  }

  async findById(id: string) {
    const person = await prisma.person.findUnique({
      where: {
        id,
      },
    })

    return person
  }

  async create(data: Person) {
    const person = await prisma.person.create({
      data,
    })

    return person
  }
}
