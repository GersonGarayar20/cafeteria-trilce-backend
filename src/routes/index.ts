import { Router } from 'express'
import { categories } from './categories'
import { menus } from './menus'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/menus', menus)
