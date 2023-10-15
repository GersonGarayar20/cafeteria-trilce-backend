import { Router } from 'express'
import { findAll, findOne, create, update, remove } from '../controllers/menus'
export const menus = Router()

menus
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', remove)
