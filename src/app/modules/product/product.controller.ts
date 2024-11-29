import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TImageFiles } from '../../interface/image.interface'
import { productServices } from './product.service'

const createPost = catchAsync(async (req, res) => {
  const postInfo = req.body
  const files = req.files as TImageFiles
  const filePaths = files.images.map((file) => `/uploads/${file.filename}`)

  const payload = {
    ...postInfo,
    images: filePaths,
  }

  const result = await productServices.createProductIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { slug } = req.params
  const result = await productServices.getSingleProductFromDB(slug)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await productServices.deleteProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const productInfo = req.body
  const files = req.files as TImageFiles

  // Check if new images are uploaded
  const filePaths = files?.images?.length
    ? files.images.map((file) => `/uploads/${file.filename}`)
    : undefined

  const payload = {
    ...productInfo,
    ...(filePaths && { images: filePaths }),
  }
  const result = await productServices.updateProductFromDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  })
})

export const productController = {
  createPost,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
}
