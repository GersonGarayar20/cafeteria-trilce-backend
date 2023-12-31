import { Router } from 'express'
import { create, findAll, findOne, remove, update } from '../controllers/user'
import { validateToken } from '../middleware/authJwt'

export const users = Router()

users
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', validateToken, create)
  .put('/:id', validateToken, update)
  .delete('/:id', validateToken, remove)
