import { Request, Response } from 'express'
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../models/categories'
import { validarCategory } from '../schemas/categorySchema'
import { RequestExtends } from '../types'
import { HttpError, ValidateDataError } from '../utils/handlelError'
import { getAllMenus } from '../models/menus'

export const findAll = async (req: Request, res: Response) => {
  try {
    const data = await getAllCategories()
    res.json({ status: 200, data, message: 'todos los usuarios' })
  } catch (e: any) {
    HttpError(res, 'ERROR_NOT_FOUND_CATEGORIES', 500)
  }
}

export const create = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role === 'admin'
    if (!role) throw new ValidateDataError('No tienes permiso para crear una categoria')

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

export const update = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para actualiar un menu')
    const result = validarCategory(req.body)
    if (!result.success) throw new ValidateDataError('falta agregar datos')

    const { id } = req.params
    const { body } = req

    const data = await updateCategory(+id, body)
    res.json({ status: 200, data, message: 'categoria creado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)

    return HttpError(res, 'ERROR_UPDATE_USER', 500)
  }
}

export const remove = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para actualiar un menu')

    const { id } = req.params

    const dataMenus = await getAllMenus()

    const isMenu = dataMenus.find(menu => menu.category_id === +id)
    if (isMenu != null) return res.json({ status: 404, mesage: 'la categoria que quiere actualizar esta vinculado con el otra tabla', data: isMenu })

    const data = await deleteCategory(+id)
    res.json({ status: 200, data, message: 'categoria removida ' + id })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)

    return HttpError(res, 'ERROR_REMOVE_CATEGORY', 500)
  }
}
