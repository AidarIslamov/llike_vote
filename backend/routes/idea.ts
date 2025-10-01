import { FastifyInstance } from 'fastify'
import { Idea } from '../models'
import { getClientIP } from '../utils/ip';

export default async function ideaRoutes(fastify: FastifyInstance) {
  fastify.get('/idea', {
    handler: async (request, reply) => {
      const clientIP = getClientIP(request);
      if (!clientIP) {
        return reply.status(400).send({ 
          error: 'Client IP address is required' 
        });
      }
        return { data: ideas }
      }
    }
  })
}
