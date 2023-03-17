import Fastify from "fastify"
import jwt from '@fastify/jwt'
import cors from "@fastify/cors"

import {authRoutes} from './routes/auth'
import {gameRoutes} from './routes/game'
import {pollRoutes} from './routes/poll'
import {userRoutes} from './routes/user'
import {guessRoutes} from './routes/guess'

//config routes
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  // TODO transfer to environment variable
  await fastify.register(jwt, {
    secret: "nlwcopa",
  })

  // await fastify.register(async function plugin01() {
  //   console.log('plugin01 register start')
  // })

  await fastify.register(authRoutes)
  await fastify.register(pollRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(userRoutes)

  await fastify.listen({ port: 3333, host: "0.0.0.0" })
}

bootstrap()
