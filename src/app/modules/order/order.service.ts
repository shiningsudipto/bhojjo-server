import mongoose from 'mongoose'
import { Order, OrderItem } from './order.model'
import { TOrder, TOrderItem } from './order.interface'
import { Request } from 'express'
import { PackageItem } from '../package/package.model'

const createOrderIntoDB = async (req: Request) => {
  const payload = req.body
  const orderItems = payload.orderItems as TOrderItem[]
  const order = payload.order as TOrder
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

const createOrderByCollectionIntoDB = async (req: Request) => {
  const payload = req.body
  const { _id, buyer, totalItems, totalPrice } = payload

  // Start a MongoDB session
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // Prepare the order
    const order = {
      price: totalPrice,
      buyer: buyer,
      totalProducts: totalItems,
    }

    // Step 1: Create the order document
    const newOrder = await Order.create([order], { session })

    const orderId = newOrder[0]._id

    // Step 2: Fetch PackageItems from the Package
    const packageItems = await PackageItem.find({ package: _id }).lean()

    // Map PackageItems into order items
    const itemsToInsert = packageItems.map((item) => ({
      productId: item.product,
      quantity: item.quantity,
      orderId: orderId,
    }))

    // Step 3: Insert the order items
    const newOrderItems = await OrderItem.insertMany(itemsToInsert, {
      session,
    })

    // Step 4: Commit the transaction
    await session.commitTransaction()
    session.endSession()

    // Return the created order and items
    return {
      newOrder: newOrder[0],
      newOrderItems,
    }
  } catch (error) {
    // Roll back the transaction in case of error
    await session.abortTransaction()
    session.endSession()
    throw new Error('Failed to create order by collection')
  }
}

const getOrdersByUserFromDB = async (id: string) => {
  const orders = await Order.find({ buyer: id }).sort({ createdAt: -1 }).lean()

  const orderIds = orders.map((order) => order._id)

  const orderItems = await OrderItem.find({ orderId: { $in: orderIds } })
    .populate({
      path: 'productId',
      select: 'title price brand slug',
    })
    .lean()

  const result = orders.map((order) => ({
    ...order,
    items: orderItems.filter(
      (item) => item.orderId.toString() === order._id.toString(),
    ),
  }))

  return result
}

const getAllOrdersFromDB = async (page: number = 1, limit: number = 15) => {
  const skip = (page - 1) * limit

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate({
      path: 'buyer',
      select: 'phone',
    })
    .skip(skip) // Skip documents for previous pages
    .limit(limit) // Limit results per page
    .lean()

  // Count total orders for pagination metadata
  const totalCount = await Order.countDocuments()

  // Return paginated response
  return {
    orders,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalOrders: totalCount,
  }
}

const getOrderInfoFromDB = async (id: string) => {
  const result = await OrderItem.find({ orderId: id })
    .populate({
      path: 'productId',
      select: 'title price images category brand',
    })
    .lean()
  return result
}

const updateOrderIntoDB = async (id: string, payload: TOrder) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const orderServices = {
  createOrderIntoDB,
  createOrderByCollectionIntoDB,
  getOrdersByUserFromDB,
  getAllOrdersFromDB,
  getOrderInfoFromDB,
  updateOrderIntoDB,
}

// const getAllOrdersFromDB = async () => {
//   // Fetch all orders
//   const orders = await Order.find().sort({ createdAt: -1 }).lean()

//   // Extract all order IDs
//   const orderIds = orders.map((order) => order._id)

//   // Fetch all order items for the extracted order IDs and populate product details
//   const orderItems = await OrderItem.find({ orderId: { $in: orderIds } })
//     .populate({
//       path: 'productId',
//       select: 'title price images', // Select the fields you need from Product
//     })
//     .lean()

//   // Combine orders with their respective order items
//   const result = orders.map((order) => ({
//     ...order,
//     items: orderItems
//       .filter((item) => item.orderId.toString() === order._id.toString())
//       .map((item) => ({
//         ...item,
//       })),
//   }))

//   return result
// }
