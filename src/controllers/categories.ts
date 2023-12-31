import { Request, Response } from 'express'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../models/categories'
import { validarCategory } from '../schemas/categorySchema'
import { RequestExtends } from '../types'
import { HttpError, ValidateDataError } from '../utils/handlelError'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllCategories()
  res.json({ status: 200, data, message: 'todos los usuarios' })
}

export const create = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role === 'admin'
    if (role) throw new ValidateDataError('No tienes permiso para crear una categoria')

    const result = validarCategory(req.body)

    if (result.success) {
      const data = await addCategory(result.data)
      res.json({ status: 200, data, message: 'Categoria Creada' })
    } else {
      throw new ValidateDataError('Dato incorrecto o incompleto')
    }
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)
    HttpError(res, e.message, 500)
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
