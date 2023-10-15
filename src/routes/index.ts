import { Router } from 'express'
import { categories } from './categories'
import { menus } from './menus'
import { orders } from './orders'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/menus', menus)
  .use('/orders', orders)
