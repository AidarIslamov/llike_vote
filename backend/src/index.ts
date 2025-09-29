import Fastify from 'fastify'
import routes from './routes/index'

const fastify = Fastify({
  logger: true,
  trustProxy: true
})

fastify.register(routes)

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}