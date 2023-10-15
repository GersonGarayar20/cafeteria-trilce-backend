import { Router } from 'express'
import { findAll, findOne, create, update, remove } from '../controllers/orders'
export const orders = Router()

orders
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', remove)
