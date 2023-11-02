import { Request } from 'express'

export interface CategoryInterface {
  id_category?: number
  name: string
}

export interface MenuInterface {
  id_menu?: number
  name: string
  description: string
  price: number
  category_id: number
}

export interface OrderInterface {
  id_order?: number
  menu_id: number
  user_id: number
  amount: number
  order_date?: string
  total_price?: number
  state?: string
  payment_method: string
}

export interface RequestExtends extends Request {
  validatedData?: object
  info?: object
  token?: string
  authToken?: string

}

export interface User {
  id_user: number
  name: string
  email: string
  password: string
  role: string

}

interface UserWithoutPassword extends Omit<User, 'password'> { }
