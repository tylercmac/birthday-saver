import fetch from 'node-fetch'

const generateRand = async () => {
  const bdays = []
  for (let i = 0; i <= 2; i++ ) {
    let randPerson = await fetch('https://api.namefake.com/random/random')
    randPerson = await randPerson.json()
    
    bdays.push(
      {
        name: randPerson.name,
        date: randPerson.birth_data,
        stokeLevel: Math.floor(Math.random() * 6)
      }
      )
  }

  return bdays
}

module.exports = { generateRand }
