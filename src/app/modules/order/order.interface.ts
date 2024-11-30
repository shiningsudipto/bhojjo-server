import { Types } from 'mongoose'

export type EOrderStatus =
  | 'pending'
  | 'inProgress'
  | 'delivering'
  | 'delivered'
  | 'canceled'
export type EOrderItemStatus = 'pending' | 'packed'

export interface TOrder {
  id: string
  price: number
  buyer: Types.ObjectId
  status: EOrderStatus
  totalProducts: number
}

export interface TOrderItem {
  id: string
  orderId: Types.ObjectId
  productId: Types.ObjectId
  quantity: number
  status: EOrderItemStatus
}
