import { FastifyInstance } from 'fastify'
import { deletePersonController } from './controllers/delete-person'
import { editPersonController } from './controllers/edit-person'
import { fetchPeopleController } from './controllers/fetch-person'
import { getPersonController } from './controllers/get-person'
import { registerPersonController } from './controllers/register-person'

export async function appRoutes(app: FastifyInstance) {
  app.post('/person', registerPersonController)
  app.get('/person/:id', getPersonController)
  app.get('/person', fetchPeopleController)
  app.put('/person/:id', editPersonController)
  app.delete('/person/:id', deletePersonController)
}
