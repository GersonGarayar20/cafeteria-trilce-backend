import { Request, Response } from 'express'
import { findAllUsers, findOneUser, createOneUser, updateOneUser, deleteOneUser, isUserRegistered } from '../models/users'
import { RequestExtends, User, UserWithoutPassword } from '../types'
import { HttpError, ValidateDataError } from '../utils/handlelError'
import { validateUserSchema } from '../schemas/userSchema'
import { encryptPassword } from '../../config/encrypt'
import { getAllOrders } from '../models/orders'

export async function findAll (req: Request, res: Response) {
  try {
    const users: User[] = await findAllUsers()
    const data: UserWithoutPassword[] = users.map(el => {
      const { password, ...dataWithinPassword } = el
      return dataWithinPassword
    })

    if (!(data.length > 0)) throw new Error('no se encontro los usuarios')

    res.json({ status: 500, data, message: 'todos los usuarios' })
  } catch (error) {
    HttpError(res, 'ERROR_NOT_FOUND_USERS', 500)
  }
}

export async function findOne (req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = await findOneUser(+id)

    res.json({ status: 200, data: [data], message: ' datos del usuuario ' + id })
  } catch (error) {
    HttpError(res, 'ERROR_NOT_FOUND_USER', 500)
  }
}

export async function create (req: RequestExtends, res: Response) {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para crear un usuario')

    let { body } = req
    const result = validateUserSchema(body)
    if (!result.success) throw new ValidateDataError('falta agregar datos')

    if ((await isUserRegistered(body.name, body.email)) != null) {
      return res.json({ status: 200, data: null, message: 'Usuario ya esta registrado' })
    }

    const encryptedPasssword = await encryptPassword(body.password)

    body = { ...body, password: encryptedPasssword }

    const { password: Password, ...data } = await createOneUser(body)

    res.json({ status: 200, data: [data], message: ' datos del usuuario ' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)

    return HttpError(res, 'ERROR_CREATE_USER', 500)
  }
}

export async function update (req: RequestExtends, res: Response) {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para actualizar un usuario')

    const { body } = req
    const { id } = req.params

    const dataOrders = await getAllOrders()

    const isOrder = dataOrders.find(orden => orden.user_id === +id)
    if (isOrder != null) return res.status(404).json({ status: 404, mesage: 'el usuario esta vinculado con el otra tabla', data: isOrder })

    const data = await updateOneUser(+id, body)

    res.json({ status: 200, data: [data], message: ' datos del usuuario ' + id })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)

    return HttpError(res, 'ERROR_UPDATE_USER', 500)
  }
}

export async function remove (req: RequestExtends, res: Response) {
  try {
    const role = req.authToken?.role
    if (role !== 'admin') throw new ValidateDataError('No tienes permiso para eliminar un usuario')

    const { id } = req.params
    const numId = parseInt(id)

    const dataOrders = await getAllOrders()

    const isOrder = dataOrders.find(orden => orden.user_id === +id)
    if (isOrder != null) return res.status(404).json({ status: 404, mesage: 'el usuario esta vinculado con el otra tabla', data: isOrder })

    if (isNaN(numId)) throw new ValidateDataError('ingreso de dato incorrecto ')
    const data = await deleteOneUser(+id)

    res.json({ status: 200, data: [data], message: ' usuario ' + id + ' eliminado' })
  } catch (e: any) {
    if (e.name === 'ValidationDataError') return HttpError(res, e.message, 400)

    return HttpError(res, 'ERROR_DELETE_USER', 500)
  }
}
