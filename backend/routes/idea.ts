import { FastifyInstance } from 'fastify'
import { Idea } from '../models'

export default async function ideaRoutes(fastify: FastifyInstance) {
  fastify.get('/idea', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          include: { 
            type: 'string',
          }
        }
      }
    },
    handler: async (request, reply) => {
      const { include } = request.query as { include?: string | string[] };
      let includeArray: string[] = []

      if (typeof include === 'string') {
        includeArray = include.split(',')
      } else if (Array.isArray(include)) {
        includeArray = include
      }
      
      if (includeArray.includes('votesCount')) {
        const ideas = await Idea.scope('withVotesCount').findAll()
        return { data: ideas }
      } else {
        const ideas = await Idea.findAll()
        return { data: ideas }
      }
    }
  })
}
