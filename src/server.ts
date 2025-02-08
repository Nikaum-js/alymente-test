import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { app } from './app'
import { env } from './core/env'
import { setupSwagger } from './domain/people/adapters/swagger'

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

setupSwagger(app)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
