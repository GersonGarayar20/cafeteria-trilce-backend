import { Router } from 'express'
import { categories } from './categories'
import { menu } from './menu'
import { autentication } from './autentication'
export const routes = Router()

routes
  .use('/categories', categories)
  .use('/menu', menu)
  .use('/autentication', autentication)
