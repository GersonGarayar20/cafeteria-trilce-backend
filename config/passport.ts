// config/passport-config.ts

import { PrismaClient } from '@prisma/client'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { encryptPassword } from './encrypt'
const prisma = new PrismaClient()
const Strategy = LocalStrategy.Strategy

passport.use('signup', new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email,
        password
      }
    })
    if (user != null) return done(null, user, { message: 'usuario ya registrado' })

    const { name } = req.body

    const encryptedPasssword = encryptPassword(password)

    user = await prisma.user.create({
      data: {
        email,
        name,
        password: await encryptedPasssword,
        role: 'client'

      }
    })
    return done(null, user, { message: 'created successfull' })
  } catch (error) {
    done(error)
  }
}))

passport.use('login', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password
      }
    })
    if (user == null) {
      return done(null, false, { message: 'user not found' })
    }
    return done(null, user, { message: 'login successfull' })
  } catch (error) {
    done(error)
  }
}))

export default passport
