import jwt from 'jsonwebtoken'

const secretKey = 'tu_clave_secreta'// Cambia esto a una clave secreta segura

export function generateToken (data: object, expiresIn: string = '1h'): string {
  return jwt.sign(data, secretKey, { expiresIn })
}

export function verifyToken (token: string): object | null {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded as object
  } catch (error) {
    return null
  }
}
