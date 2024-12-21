import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TImageFiles } from '../../interface/image.interface'
import { productServices } from './product.service'
import { TFile } from '../../interface'

const createPost = catchAsync(async (req, res) => {
  const postInfo = req.body
  console.log(postInfo)
  const files = req.files as TImageFiles
  // const filePaths = files?.images?.map((file) => `/uploads/${file.filename}`)
  const filePaths = files?.images?.map((file: TFile) => file.path)

  const payload = {
    ...postInfo,
    images: filePaths,
  }

  const result = await productServices.createProductIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
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
  // Extract query parameters
  const { category, minPrice, maxPrice, searchTerm, sortBy, sortOrder } =
    req.query

  // Parse query parameters and prepare filters
  const filters = {
    category: category as string,
    minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
    searchTerm: searchTerm as string,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  }

  const result = await productServices.getAllProductFromDB(filters)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const getAllProductForAdmin = catchAsync(async (req, res) => {
  const result = await productServices.getProductForAdminFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})
const getTopProducts = catchAsync(async (req, res) => {
  const result = await productServices.getTopProductFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.body.id
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
  // const filePaths = files?.images?.length
  //   ? files.images.map((file) => `/uploads/${file.filename}`)
  //   : undefined
  const filePaths = files?.images?.map((file: TFile) => file.path)

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
  getAllProductForAdmin,
  getTopProducts,
}
