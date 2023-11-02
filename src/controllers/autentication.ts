import { Response } from 'express'
import { RequestExtends } from '../types'

export const signUp = async (req: RequestExtends, res: Response) => {
  const user = req.user

  const response = {
    status: 'ok',
    user,
    message: req.info
  }
  res.json({ response })
}

export const logIn = async (req: RequestExtends, res: Response) => {
  const user = req.user
  const token = req.authToken

  const response = {
    status: 'ok',
    user,
    message: req.info,
    token
  }

  res.json({ response })
}

export const logOut = async (req: RequestExtends, res: Response) => {
  const response = {
    status: 'ok',
    message: 'token eliminado'
  }

  res.json({ response })
}
