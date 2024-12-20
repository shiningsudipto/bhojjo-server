import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { orderServices } from './order.service'

const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderIntoDB(req)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: result,
  })
})

const createOrderByCollection = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderByCollectionIntoDB(req)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: result,
  })
})

const getOrderByUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await orderServices.getOrdersByUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  })
})

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await orderServices.updateOrderIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  // Extract and validate query parameters
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 15

  // Fetch paginated orders
  const result = await orderServices.getAllOrdersFromDB(page, limit)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  })
})

const getOrderInfo = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await orderServices.getOrderInfoFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order info retrieved successfully',
    data: result,
  })
})

export const orderControllers = {
  createOrder,
  createOrderByCollection,
  getOrderByUser,
  getAllOrders,
  getOrderInfo,
  updateOrder,
}
