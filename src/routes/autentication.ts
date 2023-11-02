import { Router } from 'express'
import { logIn, signUp, logOut } from '../controllers/autentication'
import { authenticateLogin, authenticateSignup } from '../middleware/authenticate'
import { validatedSchemaLogin, validatedSchemaSignup } from '../middleware/validation'
import { generateToken, invalidateToken } from '../middleware/authJwt'

export const autentication = Router()

autentication
  .post('/signup', validatedSchemaSignup, authenticateSignup, signUp)

  .post('/login', validatedSchemaLogin, authenticateLogin, generateToken, logIn)

  .post('/logout', invalidateToken, logOut)
