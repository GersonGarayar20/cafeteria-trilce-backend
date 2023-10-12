import { Request, Response } from 'express'
import { getAllCategories } from '../models/categories'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllCategories()
  res.json({
    data
  })
}
