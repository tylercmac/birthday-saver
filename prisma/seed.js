import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import bdays from "../public/bdays.json";
import generator from '../app/utils/generateRand.cjs'
const { generateRand } = generator

async function seed() {
  // const joe = await prisma.user.create({
  //   data: {
  //     username: "tylercmac",
  //     // pwd: twixrox
  //     passwordhash:
  //       "$2a$10$pldxgbilqWUSiF4n8sPLieVHL0fdya.GFK1KnSbsIw2PZ/81PAZ/m",
  //   },
  // });

  const bdays = await generateRand()
  await Promise.all(
    bdays.map((bday) => {
      const data = { userid: 'e887d936-91cc-4a67-8cb9-c778f462ea5b', ...bday };
      return prisma.birthday.create({ data });
    })
  );
}

seed();
