import { FastifyInstance } from 'fastify'
import { getClientIP } from '../utils/ip'

export default async function voteRoutes(fastify: FastifyInstance) {
  fastify.get('/vote/:id', async function handler(request, reply) {
    const { id } = request.params as { id: string }
    const clientIP = getClientIP(request)
    
    request.log.info({ clientIP, voteId: id }, 'Vote request')
    
    return {
      id,
      client_ip: clientIP,
      message: `Vote recorded for idea ${id}`
    }
  })

  fastify.post('/vote/:id', async function handler(request, reply) {
    const { id } = request.params as { id: string }
    const clientIP = getClientIP(request)
    
    return {
      id,
      client_ip: clientIP,
      status: 'voted',
      timestamp: new Date().toISOString()
    }
  })
}