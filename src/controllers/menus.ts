import { Request, Response } from 'express'
import { getAllMenus, getMenuById, addMenu, updateMenu, deleteMenu } from '../models/menus'
import { validarMenu, partialValidarMenu } from '../schemas/menuSchema'
import { HttpError, ValidateDataError } from '../utils/handlelError'
import { RequestExtends } from '../types'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllMenus()
  res.json({ status: 200, data, message: 'todos los menus' })
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params

  const data = await getMenuById(+id)
  res.json({
    data
  })
}

export const create = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para crear un menu')

    const result = validarMenu(req.body)
    if (!result.success) throw new ValidateDataError('falta agregar datos')
    const data = await addMenu(result.data)

    res.json({ status: 200, data: [data], message: 'menu creado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') {
      HttpError(res, e.message, 400)
    }
    HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}

export const update = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para actualiar un menu')
    const { body } = req
    const { id } = req.params
    const result = partialValidarMenu(body)

    if (!result.success) throw new ValidateDataError('falta agregar datos')
    const data = await updateMenu(+id, body)
    res.json({ status: 200, data, message: 'menu actualizado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') {
      HttpError(res, e.message, 400)
    }
    HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}

export const remove = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para eliminar un menu')
    const { id } = req.params
    const data = await deleteMenu(+id)
    res.json({ status: 200, data, message: 'menu eliminado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') {
      HttpError(res, e.message, 400)
    }
    HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}
