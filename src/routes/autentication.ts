import { Router } from 'express'
import passport from '../../config/passport'
import { logIn, signUp } from '../controllers/autentication'

export const autentication = Router()

autentication
  .post('/signup', passport.authenticate('signup', { session: false }), signUp)

  .post('/login', passport.authenticate('login', { session: false }), logIn)
