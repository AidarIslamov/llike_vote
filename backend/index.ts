import Fastify from 'fastify'
import routes from './routes/index.js'
import { sequelize } from './models/index.js'
import cors from '@fastify/cors'


const fastify = Fastify({
  logger: true,
  trustProxy: true
})

await fastify.register(cors, {
  origin: ['http://localhost', 'http://localhost:5173'],
  credentials: true
})

fastify.register(routes)

async function initializeDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully.')
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: false, alter: false })
      console.log('Database synchronized')
    }
  } catch (error) {
    console.error('Unable to connect to database:', error)
    process.exit(1)
  }
}

async function start() {
  try {
    await initializeDatabase()
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server is running on port 3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()