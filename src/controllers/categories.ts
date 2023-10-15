import { Request, Response } from 'express'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../models/categories'
import { validarCategory } from '../schemas/categorySchema'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllCategories()
  res.json({
    data
  })
}

export const create = async (req: Request, res: Response) => {
  const result = validarCategory(req.body)

  if (result.success) {
    const data = await addCategory(result.data)
    res.json({
      data
    })
  } else {
    res.status(404).json({ data: result.error })
  }
}

export const update = async (req: Request, res: Response) => {
  const result = validarCategory(req.body)

  if (result.success) {
    const { id } = req.params
    const data = await updateCategory(+id, result.data)
    res.json({
      data
    })
  } else {
    res.status(404).json({ data: result.error })
  }
}
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await deleteCategory(+id)
  res.json({
    data
  })
}
