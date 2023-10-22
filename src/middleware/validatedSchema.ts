// validation.js
import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string()
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
