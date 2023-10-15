import { Request, Response } from 'express'
import { generateToken } from '../../config/jwtUtils'
import passport from 'passport'
/* import { User } from '@prisma/client'  */

export const signUp = async (req: Request, res: Response) => {
  const user = req.user

  const { password, ...dataUser } = user

  if (user != null) {
    return res.status(404).json({
      message: 'El usuario ya está registrado',
      error: 'Usuario existente'
    })
  }

  const token = generateToken(dataUser)
  const response = {
    status: 'ok',
    user: {
      ...dataUser
    },
    message: 'registro exitoso',
    token
  }

  res.json({ response })
}

/* export const logIn = async (err, user, info) => {
  console.log('entro')
  if (err != null) {
    return res.status(500).json({ message: 'error en el servidor', error: 'Usuario inexistente' })
  }
  if (user === false) {
    return res.status(400).json({ message: info.message })
  }

  const { password, ...dataUser } = user

  const token = generateToken(dataUser)

  const response = {
    status: 'ok',
    user: {
      ...dataUser
    },
    message: info.message,
    token
  }
  res.json({ response })
}  */

export const logIn = async (req: Request, res: Response) => {
  const user = req.user

  if (user === false) {
    return res.json({
      message: 'El usuario no está registrado',
      error: 'Usuario inexistente'
    })
  }

  const { password, ...dataUser } = user

  const token = generateToken(dataUser)

  const response = {
    status: 'ok',
    user: {
      ...dataUser
    },
    message: 'logueado satisfactoriamente',
    token
  }

  res.json({ response })
}
