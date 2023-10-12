import { Router } from 'express'
import { findAll } from '../controllers/categories'
export const categories = Router()

categories
  .get('/', findAll)
  .post('/', () => {})
  .put('/', () => {})
  .delete('/', () => {})
