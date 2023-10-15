import { Router } from 'express'
import { findAll, create, update, remove } from '../controllers/menus'
export const orders = Router()

orders
  .get('/', findAll)
  .post('/', create)
  .put('/', update)
  .delete('/', remove)
