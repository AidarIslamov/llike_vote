import { FastifyInstance } from 'fastify'
import { getClientIP } from '../utils/ip'
import {VoteService} from '../services/vote.service'

export default async function voteRoutes(fastify: FastifyInstance) {
  fastify.post('/vote/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'string',
            pattern: '^\\d+$'
          }
        },
        required: ['id']
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string }
      const ideaId = parseInt(id)
      const clientIP = getClientIP(request)

      if (!clientIP) {
        return reply.status(400).send({ 
          error: 'Client IP address is required' 
        });
      }

      try {
        const { vote } = await VoteService.createVote(ideaId, clientIP)

        return {
          id: vote.id,
          ideaId: vote.ideaId,
          status: 'voted',
          canVote: true
        }
      } catch (error: any) {
        if (error.message === 'VOTE_LIMIT_EXCEEDED') {
          return reply.status(409).send({ 
            error: 'Vote limit exceeded',
            limit: VoteService.VOTE_LIMIT,
            canVote: false,
            conflictType: 'LIMIT_EXCEEDED'
          })
        }
        
        if (error.message === 'IDEA_NOT_FOUND') {
          return reply.status(404).send({ error: 'Idea not found' })
        }

        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  })
}