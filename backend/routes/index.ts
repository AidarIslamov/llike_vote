import { FastifyInstance } from 'fastify';
import ideaRoutes from './idea';
import voteRoutes from './vote';

export default async function routes(fastify: FastifyInstance) {
  fastify.register(ideaRoutes, { prefix: '/api' })
  fastify.register(voteRoutes, { prefix: '/api' })
}