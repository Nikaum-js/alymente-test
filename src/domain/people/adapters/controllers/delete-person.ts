import { makeDeletePersonUseCase } from '@/core/factories/make-delete-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const deletePersonParamsSchema = z.object({
  id: z.string(),
})

export async function deletePersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = deletePersonParamsSchema.parse(request.params)

  const deletePersonUseCase = makeDeletePersonUseCase()

  await deletePersonUseCase.execute(id)

  return reply.status(204).send()
}
