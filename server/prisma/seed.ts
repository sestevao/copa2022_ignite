import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Susana Estevao",
      email: "superuca.dark@gmail.com",
      avatarUrl: "https://github.com/sestevao.png",
      googleId:
        "ya29.a0AVvZVspw5tQ-dWlbLOHnmKjD3IEoSUvgp121WrZLhGdcFthgR3HOo6Z-N5F2TitQjOzA8cIrsmrRdzrc5XbOyHsvxjEWlf2jGIQ9hODgK9B6nUfqOnITX4GP_i5VXgtUz-H6l3M91mW-MS-288mnAQ4858vmaCgYKAUcSARASFQGbdwaIeabruagBaI4u244Fq9zEYQ0163",
    },
  })

  const poll = await prisma.poll.create({
    data: {
      title: "Example Poll",
      code: "POLL111",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: "2023-03-15T00:06:34.159Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  })

  await prisma.game.create({
    data: {
      date: "2023-03-15T00:06:34.159Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
