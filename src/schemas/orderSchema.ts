import z from 'zod'

const orderSchema = z.object({
  menu_id: z.number().int(),
  user_id: z.number().int(),
  amount: z.number().int().positive().default(1),
  payment_method: z.string().default('planilla')
})

export const validarOrder = (object: any) => {
  return orderSchema.safeParse(object)
}

export const partialValidarOrder = (object: any) => {
  const partialOrderSchema = orderSchema.partial()
  return partialOrderSchema.safeParse(object)
}
