import { Router } from 'express'
import { findAll, create, update, remove } from '../controllers/categories'
import { validateToken } from '../middleware/authJwt'
export const categories = Router()

categories
  .get('/', validateToken, findAll)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', remove)
