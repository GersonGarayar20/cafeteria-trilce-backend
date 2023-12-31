// config/passport-config.ts

import { PrismaClient } from '@prisma/client'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { encryptPassword, verifyPassword } from './encrypt'
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
        email
      }
    })

    if (user != null) return done(null, false, { message: 'usuario ya registrado' })

    const encryptedPasssword = encryptPassword(password)

    const { name } = req.body

    user = await prisma.user.create({
      data: {
        email,
        name,
        password: await encryptedPasssword,
        role: 'client'

      }
    })

    const { password: Password, ...userWithoutPassword } = user

    return done(null, userWithoutPassword, { message: 'creado satisfactoriamente' })
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
        email
      }
    })
    if (user == null) {
      return done(null, false, { message: 'usuario o password no encontrado' })
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) return done(null, false, { message: 'usuario o password incorrecto' })

    const { password: Password, ...userWithoutPassword } = user

    return done(null, userWithoutPassword, { message: 'logueado satisfactoriamente' })
  } catch (error) {
    done(error)
  }
}))

export default passport
