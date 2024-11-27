import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { categoryServices } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await categoryServices.createCategoryIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const payload = req.body
  const { id } = req.params
  const result = await categoryServices.updateCategoryIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await categoryServices.deleteCategoryByIdFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all category successfully',
    data: result,
  })
})

export const categoryControllers = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
}
