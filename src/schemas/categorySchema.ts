import z from 'zod'

const CategorySchema = z.object({
  name: z.string()
})

export const validarCategory = (object: any) => {
  return CategorySchema.safeParse(object)
}
