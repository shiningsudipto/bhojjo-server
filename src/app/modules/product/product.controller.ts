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

export const productController = {
  createPost,
}
