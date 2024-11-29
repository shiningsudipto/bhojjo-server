import { TCategory, TSubCategory } from './category.interface'
import { Category, SubCategory } from './category.model'

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const getAllCategoryFromDB = async () => {
  const result = await Category.find()
  return result
}

const deleteCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id)
  return result
}

// sub category

const createSubCategoryIntoDB = async (payload: TSubCategory) => {
  const isCategoryAvailable = await Category.findById(payload.category)
  if (!isCategoryAvailable) {
    throw new Error('Category not found!')
  }
  const result = await SubCategory.create(payload)
  return result
}

const getSubCategoryFromDB = async () => {
  const result = await SubCategory.find()
  return result
}

const getSubCategoryByCategoryFromDB = async (id: string) => {
  const result = await SubCategory.find({ category: id })
  return result
}

const updateSubCategoryIntoDB = async (id: string, payload: TSubCategory) => {
  const result = await SubCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findByIdAndDelete(id)
  return result
}

export const categoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  getAllCategoryFromDB,
  deleteCategoryByIdFromDB,
  // sub category
  createSubCategoryIntoDB,
  getSubCategoryFromDB,
  getSubCategoryByCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
}
