import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { packageServices } from './package.service'

const createPackage = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await packageServices.createPackageIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Package created successfully',
    data: result,
  })
})

const getPackageByBuyer = catchAsync(async (req, res) => {
  const { buyerID } = req.params
  const result = await packageServices.getPackageByBuyerFromDB(buyerID)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package retrieved successfully',
    data: result,
  })
})

const createPackageItem = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await packageServices.createPackageItemIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Package item created successfully',
    data: result,
  })
})

const getPackageItemByPackage = catchAsync(async (req, res) => {
  const { packageId } = req.params
  const result = await packageServices.getPackageItemByBuyerFromDB(packageId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package item retrieved successfully',
    data: result,
  })
})

export const packageControllers = {
  createPackage,
  getPackageByBuyer,
  createPackageItem,
  getPackageItemByPackage,
}
