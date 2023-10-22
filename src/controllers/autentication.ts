import { Request, Response } from 'express'

export const signUp = async (req: Request, res: Response) => {
  const user = req.user

  const { password, ...dataUser } = user
  const token = req.authToken
  const response = {
    status: 'ok',
    user: {
      ...dataUser
    },
    message: req?.info || ''
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
