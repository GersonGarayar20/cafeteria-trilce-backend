import { Router } from 'express'
import { findAll, findOne, create, update, remove } from '../controllers/menus'
import { validateToken } from '../middleware/authJwt'
export const menus = Router()

menus
  .get('/', validateToken, findAll)
  .get('/:id', validateToken, findOne)
  .post('/', validateToken, create)
  .put('/:id', validateToken, update)
  .delete('/:id', validateToken, remove)
