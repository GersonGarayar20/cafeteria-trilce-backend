import { Response, NextFunction } from 'express'
import passport from '../../config/passport'
import { RequestExtends, UserWithoutPassword } from '../types'
import jwt, { Secret } from 'jsonwebtoken'
export const authenticateSignup = (req: RequestExtends, res: Response, next: NextFunction) => {
  passport.authenticate('signup', { session: false }, (err: Error, user: UserWithoutPassword | false, info: any) => {
    if (err != null) {
      return res.json({ message: info.message })
    }
    if (user === false) {
      return res.status(401).json({ message: info.message })
    }
    req.user = user
    req.info = info.message// Puedes guardar el usuario en el objeto request si lo necesitas
    next()
  })(req, res, next)
}

export const authenticateLogin = (req: RequestExtends, res: Response, next: NextFunction) => {
  passport.authenticate('login', { session: false }, (err: Error, user: UserWithoutPassword | false, info: any) => {
    if (err != null) {
      return res.json({ message: info.message })
    }
    if (user === false) {
      return res.status(401).json({ message: info.message })
    }
    req.user = user
    req.info = info.message // Puedes guardar el usuario en el objeto request si lo necesitas
    next()
  })(req, res, next)
}

export const validateToken = (req: RequestExtends, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

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
    res.status(401).json({ message: 'No se proporcionó el token' })
  }
}
