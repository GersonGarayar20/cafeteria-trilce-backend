import { Router } from 'express'
import { findAll, create, update, remove } from '../controllers/orders'
export const orders = Router()

orders
  .get('/', findAll)
  .post('/', create)
  .put('/', update)
  .delete('/', remove)
