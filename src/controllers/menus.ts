import { Request, Response } from 'express'
import { getAllMenus, addMenu, updateMenu, deleteMenu } from '../models/menus'
import { validarMenu, partialValidarMenu } from '../schemas/menuSchema'

export const findAll = async (req: Request, res: Response) => {
  const data = await getAllMenus()
  res.json({
    data
  })
}

export const create = async (req: Request, res: Response) => {
  const result = validarMenu(req.body)

  if (result.success) {
    const data = await addMenu(result.data)
    res.json({ data })
  } else {
    res.status(404).json({ data: result.error })
  }
}

export const update = async (req: Request, res: Response) => {
  const result = partialValidarMenu(req.body)

  if (result.success) {
    const { id } = req.params
    const data = await updateMenu(+id, result.data)
    res.json({ data })
  } else {
    res.status(404).json({ data: result.error })
  }
}

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await deleteMenu(+id)

  res.json({ data })
}
