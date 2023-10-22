import bcrypt from 'bcrypt'
const saltRounds = 10 // El número de rondas de hashing (mayor es más seguro pero más lento)

// Función para encriptar una contraseña
export async function encryptPassword (password: string) {
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

// Función para verificar una contraseña
export async function verifyPassword (inputPassword: string, hashedPassword: string) {
  console.log(inputPassword)
  const match = await bcrypt.compare(inputPassword, hashedPassword)
  return match
}
