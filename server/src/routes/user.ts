import {prisma} from "../lib/prisma"
import {FastifyInstance} from "fastify"

export async function userRoutes(fastify: FastifyInstance) {
  //route to count users
  fastify.get("/users/count", async () => {
    const count = await prisma.user.count()
    return { count }
  })
}