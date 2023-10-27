import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { RequestExtends, UserWithoutPassword } from '../types'
import { Secret } from 'jsonwebtoken';
config()

export function generateToken (req: RequestExtends, res: Response, next: NextFunction) {
  const { name, id_user } = req.user as UserWithoutPassword
  const data = { name, id_user }
  
  const secretKey =   process.env.SECRET_KEY as Secret
  const token = jwt.sign(data,secretKey, { expiresIn: '24h' })
  req.authToken = token
  next()
}
export const validateToken = (req: RequestExtends, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (token) {
    // Divide el token eliminando la palabra "Bearer" y el espacio en blanco
    const tokenParts = token.split(' ')
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenString = tokenParts[1]

      // Ahora, tokenString contiene la cadena real del token que puedes verificar
      console.log(tokenString)

      // Aquí puedes verificar el token JWT
      try {
        const secretKey = process.env.SECRET_KEY as Secret
        const decodedToken = jwt.verify(tokenString,secretKey)
        req.authToken = String(decodedToken)
        next()
      } catch (error) {
        console.error('Token inválido')
        res.status(404).json({ message: 'Token inválido' })
      }
    } else {
      console.error('Formato de token no válido')
      res.status(404).json({ message: 'Formato de token no válido' })
    }
  } else {
    console.error('No se proporcionó el token')
    res.status(404).json({ message: 'No se proporcionó el token' })
  }
}
