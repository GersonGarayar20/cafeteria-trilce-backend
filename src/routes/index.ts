import { Router } from 'express'
import { categories } from './categories'
import { auth } from './auth'
import { menus } from './menus'
import { orders } from './orders'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/auth', auth)
  .use('/menus', menus)
  .use('/orders', orders)
