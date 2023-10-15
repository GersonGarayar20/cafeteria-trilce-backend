import { PrismaClient } from '@prisma/client'
import type { CategoryInterface } from '../types'

const prisma = new PrismaClient()

export const getAllCategories = async () => {
  try {
    const data = await prisma.category.findMany()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const addCategory = async ({ name }: CategoryInterface) => {
  try {
    const data = await prisma.category.create({
      data: {
        name
      }
    })

    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const updateCategory = async (id: number, { name }: CategoryInterface) => {
  try {
    const data = await prisma.category.update({
      where: {
        id_category: id
      },
      data: {
        name
      }
    })

    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteCategory = async (id: number) => {
  try {
    const data = await prisma.category.delete({
      where: {
        id_category: id
      }
    })

    return data
  } catch (err) {
    return err
  } finally {
    await prisma.$disconnect()
  }
}
