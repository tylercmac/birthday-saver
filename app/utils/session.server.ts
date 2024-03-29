import bcrypt from 'bcryptjs'
import { db } from '../utils/db.server'
import { createCookieSessionStorage, redirect } from 'remix'

//  Login user
export const login = async ({ username, password} : { username: string, password: string}) => {
  
  const user = await db.user.findUnique({
    where: {
      username
    }
  })

  if (!user) return null

  // console.log({user})

  const isCorrectPassword = await bcrypt.compare(password, user.passwordhash)

  if (!isCorrectPassword) return null

  return user
}

export async function register({ username, password} : { username: string, password: string}) {
  const passwordhash = await bcrypt.hash(password, 10)

  return db.user.create({
    data: {
      username,
      passwordhash
    }
  })
}

export async function isUnique(username: string) {
  const user = await db.user.findUnique({
    where: {
      username
    }
  })

  if (user) return false 
  else return true
}

// Create session scret
const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('No Session Secret')
}

// Create session storage
const storage = createCookieSessionStorage({
  cookie: {
    name: 'bday_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
    httpOnly: true
  }
})

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession()
  session.set( 'userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

export const getUserSession = (request: Request ) => {
  return storage.getSession(request.headers.get('Cookie'))
}

export const getUser = async (request: Request) => {
  const session = await getUserSession(request)
  
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') {
    // return redirect('/auth/login')
    return null
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    })
    return user
  } catch (error) {
    // return redirect('/auth/login')
    console.log(error);
    return null
  }
}

// Logout user and destroy session
export async function logout ({ request } : { request: Request }) {
  
  const session = await storage.getSession(request.headers.get('Cookie'))

  return redirect('/auth/logout', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}