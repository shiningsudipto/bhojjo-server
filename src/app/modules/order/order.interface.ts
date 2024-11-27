import { Types } from 'mongoose'

export type EOrderStatus =
  | 'Pending'
  | 'InProgress'
  | 'Delivering'
  | 'Delivered'
  | 'Canceled'
export type EOrderItemStatus = 'Pending' | 'Packed'

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
