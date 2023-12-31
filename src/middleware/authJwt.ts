import { config } from 'dotenv'
import { NextFunction, Response, Request } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { RequestExtends, UserWithoutPassword } from '../types'
import { HttpError } from '../utils/handlelError'

config()

const tokenBlacklist = new Set<string>()

export function generateToken (req: RequestExtends, res: Response, next: NextFunction) {
  const { name, id_user, role, email } = req.user as UserWithoutPassword
  const data = { name, id_user, role, email }

  const secretKey = process.env.SECRET_KEY as Secret
  const token = jwt.sign(data, secretKey, { expiresIn: '24h' })
  req.authToken = token
  next()
}
export const validateToken = (req: RequestExtends, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (token !== null && token !== undefined) {
    const tokenParts = token.split(' ')
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenString = tokenParts[1]

      try {
        const secretKey = process.env.SECRET_KEY as Secret
        const decodedToken = jwt.verify(tokenString, secretKey)
        req.authToken = decodedToken
        next()
      } catch (error) {
        HttpError(res, 'Token inválido', 400)
      }
    } else {
      HttpError(res, 'Formato de token no válido', 400)
    }
  } else {
    HttpError(res, 'No se proporcionó el token', 400)
  }
}

export const invalidateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (token == null || token === undefined) return res.status(401).json({ message: 'No se proporcionó el token' })

  const tokenParts = token.split(' ')

  if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
    const tokenString = tokenParts[1]

    tokenBlacklist.add(tokenString)

    return next()
  }

  return res.status(401).json({ message: 'Token Incorrecto' })
}
