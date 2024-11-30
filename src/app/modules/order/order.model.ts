import mongoose, { Schema } from 'mongoose'
import { TOrder, TOrderItem } from './order.interface'

const orderSchema = new Schema<TOrder>({
  price: { type: Number, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'delivering', 'delivered', 'canceled'],
    default: 'pending',
  },
  totalProducts: { type: Number, required: true },
})

export const Order = mongoose.model('Order', orderSchema)

const orderItemSchema = new Schema<TOrderItem>({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'packed'],
    default: 'pending',
  },
})

export const OrderItem = mongoose.model('OrderItem', orderItemSchema)
