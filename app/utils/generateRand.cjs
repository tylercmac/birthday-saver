const fetch = require('node-fetch')

const generateRand = async () => {
  const bdays = []
  for (let i = 0; i <= 20; i++ ) {
    let randPerson = await fetch('https://api.namefake.com')
    randPerson = await randPerson.json()
    
    bdays.push(
      {
        name: randPerson.name,
        date: randPerson.birth_data,
        stokelevel: Math.floor(Math.random() * 6),
        notes: ''
      }
    )
  }
  console.log({ bdays })
  return bdays
}

module.exports = { generateRand }
