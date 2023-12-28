import { Request, Response } from 'express'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../models/categories'
import { validarCategory } from '../schemas/categorySchema'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllCategories()
  res.json({ status: 200, data, message: 'todos los usuarios' })
}

export const create = async (req: Request, res: Response) => {
  const result = validarCategory(req.body)

  if (result.success) {
    const data = await addCategory(result.data)
    res.json({ status: 200, data, message: 'todos los usuarios' })
  } else {
    res.status(404).json({ status: 400, data: result.error })
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
