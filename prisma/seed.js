const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bdays = require("../public/bdays.json");

async function seed() {
  const joe = await prisma.user.create({
    data: {
      username: "joemamma",
      // pwd: twixrox
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    bdays.map((bday) => {
      const data = { userId: joe.id, ...bday };
      return prisma.birthday.create({ data });
    })
  );
}

seed();
