import z from 'zod'

const menuSchema = z.object({
  name: z.string(),
  description: z.string().default('descripcion'),
  price: z.number().positive(),
  category_id: z.number().int()
})

export const validarMenu = (object: any) => {
  return menuSchema.safeParse(object)
}

export const partialValidarMenu = (object: any) => {
  const partialMenuSchema = menuSchema.partial()
  return partialMenuSchema.safeParse(object)
}
