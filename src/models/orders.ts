import { PrismaClient } from '@prisma/client'
import type { OrderInterface } from '../types'

const prisma = new PrismaClient()

export const getAllOrders = async () => {
  try {
    const data = await prisma.order.findMany({
      include: {
        menu: true,
        user: true
      }
    })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const getOrderById = async (id: number) => {
  try {
    const data = await prisma.order.findUnique({
      where: {
        id_order: id
      }
    })

    console.log(data)
    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const addOrder = async (order: OrderInterface) => {
  try {
    const { menu_id: menuId } = order

    const menu = await prisma.menu.findUnique({
      where: {
        id_menu: menuId
      }
    })

    if (menu !== null) {
      const total = Number(menu.price) * order.amount
      const data = await prisma.order.create({
        data: {
          ...order,
          state: 'pendiente',
          total_price: total
        },
        include: {
          menu: true,
          user: true
        }
      })

      console.log(data)
      return data
    } else {
      return null
    }
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const updateOrder = async (id: number, order: any) => {
  try {
    const data = await prisma.order.update({
      where: {
        id_order: id
      },
      data: {
        ...order
      },
      include: {
        menu: true,
        user: true
      }
    })

    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteOrder = async (id: number) => {
  try {
    const data = await prisma.menu.delete({
      where: {
        id_menu: id
      }
    })

    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}
