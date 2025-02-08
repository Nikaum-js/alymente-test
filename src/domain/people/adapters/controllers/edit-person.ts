import {
  PersonCpfAlreadyExistsError,
  PersonEmailAlreadyExistsError,
  PersonNotFoundError,
} from '@/core/errors/person-errors'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPeopleRepository } from '../../application/prisma/prisma-people-repository'
import { EditPersonUseCase } from '../../application/use-cases/edit-person'

export async function editPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editPersonParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

  const editPersonBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    dateOfBirth: z
      .string()
      .transform((val) => new Date(val))
      .optional(),
    cpf: z.string().regex(cpfRegex, 'Invalid CPF format').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })

  const { id } = editPersonParamsSchema.parse(request.params)
  const { name, email, dateOfBirth, cpf, phone, address, city, state } =
    editPersonBodySchema.parse(request.body)

  try {
    const peopleRepository = new PrismaPeopleRepository()
    const editPersonUseCase = new EditPersonUseCase(peopleRepository)

    const { person } = await editPersonUseCase.execute({
      id,
      name,
      email,
      cpf,
      dateOfBirth,
      phone,
      address,
      city,
      state,
    })

    return reply.status(200).send({ person })
  } catch (err) {
    console.log(err)
    if (err instanceof PersonEmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PersonCpfAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PersonNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
