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

  const editPersonBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    dateOfBirth: z.coerce.date().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })

  const { id } = editPersonParamsSchema.parse(request.params)
  const { name, email, dateOfBirth, phone, address, city, state } =
    editPersonBodySchema.parse(request.body)

  const peopleRepository = new PrismaPeopleRepository()
  const editPersonUseCase = new EditPersonUseCase(peopleRepository)

  const { person } = await editPersonUseCase.execute({
    id,
    name,
    email,
    dateOfBirth,
    phone,
    address,
    city,
    state,
  })

  return reply.status(200).send({ person })
}
