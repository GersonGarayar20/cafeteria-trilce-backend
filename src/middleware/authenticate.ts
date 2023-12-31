import { Response, NextFunction } from 'express'
import passport from '../../config/passport'
import { RequestExtends, UserWithoutPassword } from '../types'
import jwt, { Secret } from 'jsonwebtoken'
import { HttpError } from '../utils/handlelError'
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

export const validateTokenSesion = (req: RequestExtends, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (token !== null && token !== undefined) {
    const tokenParts = token.split(' ')
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenString = tokenParts[1]
      try {
        const secretKey = process.env.SECRET_KEY as Secret
        const decodedToken = jwt.verify(tokenString, secretKey)
        res.json({ data: decodedToken, status: 200, message: 'usuario correcto' })
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
