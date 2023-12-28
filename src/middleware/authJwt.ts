import { config } from 'dotenv'
import { NextFunction, Response, Request } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { RequestExtends, UserWithoutPassword } from '../types'

config()

const tokenBlacklist = new Set<string>()

export function generateToken (req: RequestExtends, res: Response, next: NextFunction) {
  const { name, id_user } = req.user as UserWithoutPassword
  const data = { name, id_user }

  const secretKey = process.env.SECRET_KEY as Secret
  const token = jwt.sign(data, secretKey, { expiresIn: '24h' })
  req.authToken = token
  next()
}
export const validateToken = (req: RequestExtends, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  console.log('entro hasta aqui')
  if (token !== null && token !== undefined) {
    const tokenParts = token.split(' ')
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenString = tokenParts[1]

      // Ahora, tokenString contiene la cadena real del token que puedes verificar
      console.log(tokenString)

      /* if (tokenBlacklist.has(tokenString)) {
        return res.status(401).json({ message: 'Token inválido' })
      } */
      // Aquí puedes verificar el token JWT
      try {
        const secretKey = process.env.SECRET_KEY as Secret
        const decodedToken = jwt.verify(tokenString, secretKey)
        res.json({ decodedToken, status: 200, message: 'usuario correcto' })
      } catch (error) {
        console.error('Token inválido')
        res.status(404).json({ status: 404, data: null, message: 'Token inválido' })
      }
    } else {
      console.error('Formato de token no válido')
      res.status(404).json({ status: 404, data: null, message: 'Formato de token no válido' })
    }
  } else {
    console.error('No se proporcionó el token')
    res.status(401).json({ status: 404, data: null, message: 'No se proporcionó el token' })
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
