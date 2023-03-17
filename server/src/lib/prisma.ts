import { PrismaClient } from '@prisma/client'

// Connection with database
export const prisma = new PrismaClient({
  log: ['query']
})