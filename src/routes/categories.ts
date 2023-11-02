import { Router } from 'express'
import { findAll, create, update, remove } from '../controllers/categories'
import { validateToken } from '../middleware/authJwt'
export const categories = Router()

categories
  .get('/', validateToken, findAll)
  .post('/', validateToken, create)
  .put('/:id', validateToken, update)
  .delete('/:id', validateToken, remove)
