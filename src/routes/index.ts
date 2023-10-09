import { Router } from 'express'
import { categories } from './categories'

export const routes = Router()

routes
  .use('/categories', categories)
