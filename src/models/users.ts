
import { PrismaClient } from '@prisma/client'

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
