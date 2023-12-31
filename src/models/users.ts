
import { PrismaClient } from '@prisma/client'
import { User } from '../types'

const prisma = new PrismaClient()

export const verifyUserModel = async (email: string, password: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        email,
        password
      }
    })
    return data
  } catch (error) {
    return error
  }
}
export const isUserRegistered = async (name: string, email: string): Promise<User | null> => {
  const data = await prisma.user.findUnique({
    where: {
      email
    }
  })
  return data
}

export const findAllUsers = async (): Promise<User[] | any> => {
  const data = await prisma.user.findMany({})
  return data
}

export const findOneUser = async (id: number) => {
  const data = await prisma.user.findUnique({
    where: {
      id_user: id
    }
  })

  return data
}
export const createOneUser = async (user: User) => {
  const data = await prisma.user.create({
    data: {
      ...user
    }
  })

  return data
}
export const updateOneUser = async (id: number, user: any) => {
  const data = await prisma.user.update({
    where: {
      id_user: id
    },
    data: {
      ...user
    }
  })

  return data
}
export const deleteOneUser = async (id: number) => {
  console.log(id)
  const data = await prisma.user.delete({
    where: {
      id_user: id
    }
  })
  return data
}
