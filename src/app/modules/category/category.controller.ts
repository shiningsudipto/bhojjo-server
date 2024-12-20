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
  const id = req.body.id
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

const getAllSubCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getSubCategoryFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all sub-category successfully',
    data: result,
  })
})

const getSubCategoryByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result =
    await categoryServices.getSubCategoryByCategoryFromDB(categoryId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved sub-category successfully',
    data: result,
  })
})

const createSubCategory = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await categoryServices.createSubCategoryIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all sub-category successfully',
    data: result,
  })
})

const updateSubCategory = catchAsync(async (req, res) => {
  const { sCategoryId } = req.params
  const payload = req.body
  const result = await categoryServices.updateSubCategoryIntoDB(
    sCategoryId,
    payload,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub-category updated successfully',
    data: result,
  })
})

const deleteSubCategory = catchAsync(async (req, res) => {
  const { sCategoryId } = req.params
  const result = await categoryServices.deleteSubCategoryFromDB(sCategoryId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub-category deleted successfully',
    data: result,
  })
})

export const categoryControllers = {
  // category
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
  // sub category
  getAllSubCategory,
  getSubCategoryByCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
}
