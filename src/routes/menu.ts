import { Router } from 'express'
import { findAll } from '../controllers/menu'
export const menu = Router()

menu
  .get('/', findAll)
  .post('/', () => {})
  .put('/', () => {})
  .delete('/', () => {})
