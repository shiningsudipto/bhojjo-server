import { TCategory } from './category.interface'
import { Category } from './category.model'

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

export const categoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  getAllCategoryFromDB,
  deleteCategoryByIdFromDB,
}
