// src/domain/people/use-cases/delete-person.ts
import { PersonNotFoundError } from '@/core/errors/person-errors'
import { PeopleRepository } from '../repositories/people-repository'

export class DeletePersonUseCase {
  constructor(private peopleRepository: PeopleRepository) {}

  async execute(id: string): Promise<void> {
    const person = await this.peopleRepository.findById(id)

    if (!person) {
      throw new PersonNotFoundError()
    }

    await this.peopleRepository.delete(id)
  }
}
