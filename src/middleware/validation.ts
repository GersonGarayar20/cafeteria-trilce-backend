import { NextFunction, Response } from 'express'
import { loginSchema, signupSchema, logoutSchema } from './validatedSchema'
import { RequestExtends } from '../types'

export function validatedSchemaSignup (req: RequestExtends, res: Response, next: NextFunction) {
  try {
    const validatedData = signupSchema.parse(req.body)
    req.validatedData = validatedData
    next()
  } catch (error) {
    const data = { ...req.body }
    res.status(400).json({ data, message: 'faltan datos' })
  }
}

export function validatedSchemaLogin (req: RequestExtends, res: Response, next: NextFunction) {
  try {
    const validatedData = loginSchema.parse(req.body)
    req.validatedData = validatedData
    next()
  } catch (error) {
    const data = { ...req.body }
    res.status(400).json({ data, message: 'faltan datos' })
  }
}
export function validateSchemaLogout (req: RequestExtends, res: Response, next: NextFunction) {
  try {
    const validatedData = logoutSchema.parse(req.body)
    req.validatedData = validatedData
    next()
  } catch (error) {
    const data = { ...req.body }
    res.status(400).json({ data, message: 'falta ingresar el token' })
  }
}
