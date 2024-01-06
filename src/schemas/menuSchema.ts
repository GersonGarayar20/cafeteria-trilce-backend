import z from 'zod'

const menuSchema = z.object({
  name: z.string(),
  description: z.string().default('descripcion'),
  price: z.number().positive(),
  category_id: z.number().int(),
  url: z.optional(z.string().url()).default('https://i.pinimg.com/564x/fd/80/ec/fd80ecec48eba2a9adb76e4133905879.jpg') // agregar url optional
})

export const validarMenu = (object: any) => {
  return menuSchema.safeParse(object)
}

export const partialValidarMenu = (object: any) => {
  const partialMenuSchema = menuSchema.partial()
  return partialMenuSchema.safeParse(object)
}
