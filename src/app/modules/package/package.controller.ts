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

const updatePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params
  const payload = req.body
  const result = await packageServices.updatePackageIntoDB(packageId, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package updated successfully',
    data: result,
  })
})

const deletePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params
  const result = await packageServices.deletePackageFromDB(packageId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package deleted successfully',
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

const updatePackageItem = catchAsync(async (req, res) => {
  const { packageItemId } = req.params
  const payload = req.body
  const result = await packageServices.updatePackageItemIntoDB(
    packageItemId,
    payload,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package item updated successfully',
    data: result,
  })
})

const deletePackageItem = catchAsync(async (req, res) => {
  const { packageItemId } = req.params
  const result = await packageServices.deletePackageFromDB(packageItemId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package item deleted successfully',
    data: result,
  })
})

export const packageControllers = {
  // package
  createPackage,
  getPackageByBuyer,
  updatePackage,
  deletePackage,
  // package item
  createPackageItem,
  getPackageItemByPackage,
  updatePackageItem,
  deletePackageItem,
}
