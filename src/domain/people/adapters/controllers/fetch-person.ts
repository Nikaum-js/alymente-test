import { makeFetchPeopleUseCase } from '@/core/factories/make-list-people'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPeopleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPeopleQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).max(100).default(10),
  })

  const { page, perPage } = fetchPeopleQuerySchema.parse(request.query)

  const fetchPeopleUseCase = makeFetchPeopleUseCase()
  const { people, totalCount } = await fetchPeopleUseCase.execute({
    page,
    perPage,
  })

  return reply.status(200).send({
    people,
    totalCount,
  })
}
