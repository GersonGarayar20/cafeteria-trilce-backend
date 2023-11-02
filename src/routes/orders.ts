import { Router } from 'express'
import { findAll, findOne, create, update, remove } from '../controllers/orders'
import { validateToken } from '../middleware/authJwt'
export const orders = Router()

orders
  .get('/', validateToken, findAll)
  .get('/:id', validateToken, findOne)
  .post('/', validateToken, create)
  .put('/:id', validateToken, update)
  .delete('/:id', validateToken, remove)
