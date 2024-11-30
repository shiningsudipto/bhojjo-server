import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { orderServices } from './order.service'

const createOrder = catchAsync(async (req, res) => {
  //   const { order, orderItems } = req.body

  const payload = req.body

  console.log({ payload })

  //   const result = await orderServices.createOrderIntoDB(order, orderItems)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: payload,
  })
})

export const orderControllers = {
  createOrder,
}
