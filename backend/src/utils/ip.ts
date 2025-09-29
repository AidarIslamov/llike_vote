import { FastifyRequest } from 'fastify'

export function getClientIP(request: FastifyRequest): string {
  const forwarded = request.headers['x-forwarded-for']
  if (forwarded) {
    if (Array.isArray(forwarded)) {
      return forwarded[0].split(',')[0].trim()
    }
    return forwarded.split(',')[0].trim()
  }
  
  return request.ip || 'unknown'
}