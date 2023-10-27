import { Request, Response } from 'express'
import { RequestExtends } from '../types'

export const signUp = async (req: RequestExtends, res: Response) => {
  const user = req.user

  const response = {
    status: 'ok',
    user,
    message: req?.info
  }
  res.json({ response })
}

export const logIn = async (req: Request, res: Response) => {
  const user = req.user
  const token = req?.authToken
  const { password, ...dataUser } = user

  const response = {
    status: 'ok',
    user: {
      ...dataUser
    },
    message: req?.info || '',
    token
  }

  res.json({ response })
}
