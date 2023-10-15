import { Router } from 'express'
import { findAll, create, update, remove } from '../controllers/menus'
export const menus = Router()

menus
  .get('/', findAll)
  .post('/', create)
  .put('/', update)
  .delete('/', remove)
