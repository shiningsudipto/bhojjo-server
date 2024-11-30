import mongoose from 'mongoose'
import { Order, OrderItem } from './order.model'
import { TOrder, TOrderItem } from './order.interface'

const createOrderIntoDB = async (order: TOrder, orderItems: TOrderItem[]) => {
  // Start a session
  const session = await mongoose.startSession()
  try {
    // Start a transaction
    session.startTransaction()

    const totalProducts = orderItems.reduce(
      (total, item) => total + item.quantity,
      0,
    )

    const orderInfo = {
      ...order,
      totalProducts,
    }

    // Create the order
    const newOrder = await Order.create([orderInfo], { session })

    const orderId = newOrder[0]._id
    const itemsToInsert = orderItems.map((item) => ({ ...item, orderId }))

    // Create order items
    const newOrderItems = await OrderItem.insertMany(itemsToInsert, {
      session,
    })

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    return {
      newOrder: newOrder[0],
      newOrderItems,
    }
  } catch (error) {
    // Roll back the transaction
    await session.abortTransaction()
    session.endSession()
    throw new Error('Failed to create order')
  }
}

export const orderServices = {
  createOrderIntoDB,
}
