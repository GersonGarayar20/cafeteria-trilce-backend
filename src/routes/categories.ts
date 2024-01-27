import { Router } from 'express'
import { findAll, create, update, remove, findOne } from '../controllers/categories'
import { validateToken } from '../middleware/authJwt'
export const categories = Router()

categories
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', validateToken, create)
  .put('/:id', validateToken, update)
  .delete('/:id', validateToken, remove)
