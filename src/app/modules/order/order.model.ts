import mongoose, { Schema } from 'mongoose'
import { TOrder, TOrderItem } from './order.interface'

const orderSchema = new Schema<TOrder>({
  id: { type: String, required: true },
  price: { type: Number, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Delivering', 'Delivered', 'Canceled'],
    default: 'Pending',
    required: true,
  },
  totalProducts: { type: Number, required: true },
})

export const Order = mongoose.model('Order', orderSchema)

const orderItemSchema = new Schema<TOrderItem>({
  id: { type: String, required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Packed'],
    default: 'Pending',
    required: true,
  },
})

export const OrderItem = mongoose.model('OrderItem', orderItemSchema)
