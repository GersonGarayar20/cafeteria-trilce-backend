import { Router } from 'express'
import { categories } from './categories'
import { menu } from './menu'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/menu', menu)
