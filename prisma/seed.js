const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bdays = require("../public/bdays.json");

async function seed() {
  const joe = await prisma.user.create({
    data: {
      username: "tylercmac",
      // pwd: twixrox
      passwordhash:
        "$2a$10$pldxgbilqWUSiF4n8sPLieVHL0fdya.GFK1KnSbsIw2PZ/81PAZ/m",
    },
  });

  await Promise.all(
    bdays.map((bday) => {
      const data = { userid: joe.id, ...bday };
      return prisma.birthday.create({ data });
    })
  );
}

seed();
