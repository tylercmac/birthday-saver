const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
const { generateRand } = require('../generateRand.cjs')
// const fetch = require('node-fetch')

// const generateRand = async () => {
//   const bdays = []
//   for (let i = 0; i <= 2; i++ ) {
//     let randPerson = await fetch('https://api.namefake.com/random/random')
//     randPerson = await randPerson.json()
//     console.log(randPerson.name)
    
//     bdays.push(
//       {
//         name: randPerson.name,
//         date: randPerson.birth_data,
//         stokeLevel: Math.floor(Math.random() * 6)
//       }
//       )
//   }

//   return bdays
// }

async function seed () {
  generateRand();
  
  // await Promise.all(
  //   generateBdays().map(bday => {
  //     return db.post.create({ data: bday })
  //   })
  // )
}


seed()