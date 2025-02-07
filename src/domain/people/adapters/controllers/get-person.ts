import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetPersonUseCase } from '@/core/factories/make-get-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPersonParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPersonParamsSchema.parse(request.params)

  try {
    const getPersonUseCase = makeGetPersonUseCase()
    const { person } = await getPersonUseCase.execute({ id })

    return reply.status(200).send({
      person,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
