import {
  PersonCpfAlreadyExistsError,
  PersonEmailAlreadyExistsError,
} from '@/core/errors/person-errors'
import { makeRegisterPersonUseCase } from '@/core/factories/make-register-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

export async function registerPersonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    dateOfBirth: z.string().transform((val) => new Date(val)),
    cpf: z.string().regex(cpfRegex, 'Invalid CPF format'),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string(),
    state: z.string(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const registerPersonUseCase = makeRegisterPersonUseCase()

    const { person } = await registerPersonUseCase.execute(data)

    return reply.status(201).send({ person })
  } catch (err) {
    if (err instanceof PersonEmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PersonCpfAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
