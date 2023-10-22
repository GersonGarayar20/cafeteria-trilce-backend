import { NextFunction, Request, Response } from 'express'
import { loginSchema, signupSchema } from './validatedSchema'

export function validatedSchemaSignup (req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = signupSchema.parse(req.body)
    req.validatedData = validatedData
    next()
  } catch (error) {
    const data = { ...req.body }
    res.status(400).json({ data, message: 'faltan datos' })
  }
}

export function validatedSchemaLogin (req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = loginSchema.parse(req.body)
    req.validatedData = validatedData
    next()
  } catch (error) {
    const data = { ...req.body }
    res.status(400).json({ data, message: 'faltan datos' })
  }
}
