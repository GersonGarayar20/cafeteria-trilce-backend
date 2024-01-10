import { PrismaClient } from '@prisma/client'
import type { MenuInterface } from '../types'

const prisma = new PrismaClient()

export const getAllMenus = async () => {
  const data = await prisma.menu.findMany({
    include: {
      category: true
    }
  })
  console.log(data)
  return data
}

export const getMenuById = async (id: number) => {
  try {
    const data = await prisma.menu.findUnique({
      where: {
        id_menu: id
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

export const addMenu = async (menu: MenuInterface) => {
  const data = await prisma.menu.create({
    data: {
      ...menu
    },
    include: {
      category: true
    }
  })
  return data
}

export const updateMenu = async (id: number, menu: any) => {
  const data = await prisma.menu.update({
    where: {
      id_menu: id
    },
    data: {
      ...menu
    },
    include: {
      category: true
    }
  })
  return data
}

export const deleteMenu = async (id: number) => {
  const data = await prisma.menu.delete({
    where: {
      id_menu: id
    }
  })

  return data
}
