import { FastifyInstance } from 'fastify'

export default async function ideaRoutes(fastify: FastifyInstance) {
  fastify.get('/idea', async function handler(request, reply) {
    return {
      data: [
        {
          id: 1,
          title: 'Test1'
        },
        {
          id: 2,
          title: 'Test2'
        }
      ]
    }
  })
}
