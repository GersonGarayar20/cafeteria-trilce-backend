import { Request, Response } from 'express'

export const logIn = async (req: Request, res: Response) => {
  console.log(req.body)
  res.json({ message: 'ok' })
}
export const signUp = async (req: Request, res: Response) => {
  const data = req.user
  console.log(data)
  res.json({ data })
}
