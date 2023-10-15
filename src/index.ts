import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import passport from '../config/passport'
import session from 'express-session'

import { routes } from './routes'

dotenv.config()

const app = express()

app.use(session({
  secret: 'tu_clave_secreta', // Cambia esto a una clave segura
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
