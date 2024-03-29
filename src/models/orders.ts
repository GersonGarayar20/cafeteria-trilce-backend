import { PrismaClient } from '@prisma/client'
import type { OrderInterface } from '../types'

const prisma = new PrismaClient()

export const getAllOrders = async () => {
  const data = await prisma.order.findMany({
    include: {
      user: true,
      menu: true
    }
  })
  return data
}

export const getOrderById = async (id: number) => {
  const data = await prisma.order.findUnique({
    where: {
      id_order: id
    }
  })
  console.log(data)
  return data
}

export const addOrder = async (order: OrderInterface) => {
  const { menu_id: menuId, user_id } = order

  const menu = await prisma.menu.findUnique({
    where: {
      id_menu: menuId
    }
  })

  const userid = await prisma.user.findUnique({
    where: {
      id_user: user_id
    }
  })

  if (menu !== null && userid !== null) {
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

    return data
  }

  return null
}

export const updateOrder = async (id: number, order: any) => {
  const { menu_id: menuId } = order

  const menu = await prisma.menu.findUnique({
    where: {
      id_menu: menuId
    }
  })

  if (menu !== null) {
    const total = Number(menu.price) * order.amount

    const data = await prisma.order.update({
      where: {
        id_order: id
      },
      data: {
        ...order,
        total_price: total
      },
      include: {
        menu: true,
        user: true
      }
    })

    return data
  }
}

export const deleteOrder = async (id: number) => {
  const data = await prisma.order.delete({
    where: {
      id_order: id
    }
  })

  return data
}
