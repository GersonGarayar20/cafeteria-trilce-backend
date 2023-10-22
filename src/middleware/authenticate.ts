import { Request, Response, NextFunction } from 'express'
import passport from '../../config/passport'

export const authenticateSignup = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('signup', { session: false }, (err: Error, user: User | false, info: any) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    req.user = user
    req.info = info // Puedes guardar el usuario en el objeto request si lo necesitas
    next()
  })(req, res, next)
}

export const authenticateLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', { session: false }, (err: Error, user: User | false, info: any) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    req.user = user
    req.info = info // Puedes guardar el usuario en el objeto request si lo necesitas
    next()
  })(req, res, next)
}
