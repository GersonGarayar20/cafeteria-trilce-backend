import { Request, Response } from 'express'
import { getAllOrders, getOrderById, addOrder, updateOrder, deleteOrder } from '../models/orders'
import { validarOrder, partialValidarOrder } from '../schemas/orderSchema'
import { HttpError, ValidateDataError } from '../utils/handlelError'
import { RequestExtends } from '../types'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllOrders()
  console.log(data)
  res.json({ status: 200, data, message: 'todos las ordenes' })
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params

  const data = await getOrderById(+id)
  res.json({
    data
  })
}

export const create = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para crear una orden')
    const result = validarOrder(req.body)

    if (!result.success) throw new ValidateDataError('falta agregar datos o son incorrectos ')
    const data = await addOrder(result.data)
    res.json({ status: 200, data, messasge: 'creado una orden' })
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
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para crear una categoria')

    const result = partialValidarOrder(req.body)
    if (!result.success) throw new ValidateDataError('falta agregar datos o son incorrectos ')

    const { id } = req.params
    const data = await updateOrder(+id, result.data)

    res.json({ status: 200, data, message: 'orden eliminado' })
  } catch (e: any) {
    console.log(e.name)
    if (e.name === 'ValidationDataError') {
      HttpError(res, e.message, 400)
    }
    HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}

export const remove = async (req: RequestExtends, res: Response) => {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para eliminar una orden')
    const { id } = req.params
    const data = await deleteOrder(+id)

    res.json({ status: 200, data, message: 'orden eliminado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') {
      HttpError(res, e.message, 400)
    }
    HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}
