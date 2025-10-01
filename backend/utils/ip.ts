import { FastifyRequest } from 'fastify'

export function getClientIP(request: FastifyRequest): string | null {
  const forwarded = request.headers['x-forwarded-for']
  if (forwarded) {
    if (Array.isArray(forwarded)) {
      return forwarded[0].split(',')[0].trim()
    }
    return forwarded.split(',')[0].trim()
  }
  
  return validateIP(request.ip)
}


function validateIP(ip: string): string | null {
  if (!ip) return null;
  
  // Простая валидация формата
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([a-fA-F0-9:]+)$/;
  
  if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
    return ip;
  }
  
  return null;
}