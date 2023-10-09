import { Router } from 'express'

export const categories = Router()

categories
  .get('/', (req, res) => {
    res.json('data')
  })
