import z from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string()
})

export const validateUserSchema = (object: any) => {
  return userSchema.safeParse(object)
}
