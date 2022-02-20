const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const bdays = require('../public/bdays.json')

async function seed () {
  
  await Promise.all(
    bdays.map(bday => {
      return db.birthday.create({ data: bday })
    })
  )
}

seed()