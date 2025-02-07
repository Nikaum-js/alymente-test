import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export async function setupSwagger(app: FastifyInstance) {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Alymente API V1',
        description: 'Documentação da API do teste da alymente',
        version: '1.0.0',
      },
      tags: [
        { name: 'Persons', description: 'Endpoints relacionados a pessoas' },
      ],
      paths: {
        '/person': {
          get: {
            tags: ['Persons'],
            summary: 'Fetch a list of people',
            parameters: [
              {
                name: 'page',
                in: 'query',
                schema: {
                  type: 'integer',
                  minimum: 1,
                  default: 1,
                },
              },
              {
                name: 'perPage',
                in: 'query',
                schema: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 100,
                  default: 10,
                },
              },
            ],
            responses: {
              200: {
                description: 'List of people',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        people: {
                          type: 'array',
                          items: {
                            type: 'object',
                          },
                        },
                        totalCount: {
                          type: 'integer',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ['Persons'],
            summary: 'Register a new person',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      dateOfBirth: { type: 'string', format: 'date' },
                      cpf: {
                        type: 'string',
                        pattern: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$',
                      },
                      phone: { type: 'string' },
                      address: { type: 'string' },
                      city: { type: 'string' },
                      state: { type: 'string' },
                    },
                    required: [
                      'name',
                      'email',
                      'dateOfBirth',
                      'cpf',
                      'city',
                      'state',
                    ],
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Person registered',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        person: {
                          type: 'object',
                        },
                      },
                    },
                  },
                },
              },
              409: {
                description: 'Email or CPF already exists',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/person/{id}': {
          get: {
            tags: ['Persons'],
            summary: 'Get a person by ID',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            ],
            responses: {
              200: {
                description: 'Person found',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        person: {
                          type: 'object',
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Person not found',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          put: {
            tags: ['Persons'],
            summary: 'Update a person by ID',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      dateOfBirth: { type: 'string', format: 'date' },
                      phone: { type: 'string' },
                      address: { type: 'string' },
                      city: { type: 'string' },
                      state: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Person updated',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        person: {
                          type: 'object',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ['Persons'],
            summary: 'Delete a person by ID',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            ],
            responses: {
              204: {
                description: 'Person deleted',
              },
            },
          },
        },
      },
    },
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  })
}
