import { Request, Response } from 'express'
import { getAllCategories } from '../models/menu'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllCategories()
  res.json({
    data
  })
}
