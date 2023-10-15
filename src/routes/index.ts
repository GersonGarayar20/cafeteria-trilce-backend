import { Router } from 'express'
import { categories } from './categories'
import { autentication } from './autentication'
import { menus } from './menus'
import { orders } from './orders'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/autentication', autentication)
  .use('/menus', menus)
  .use('/orders', orders)
