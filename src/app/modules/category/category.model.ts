import mongoose, { Schema } from 'mongoose'
import { TCategory, TSubCategory } from './category.interface'

const categorySchema = new Schema<TCategory>({
  categoryName: { type: String, required: true },
})

export const Category = mongoose.model('Category', categorySchema)

const subCategorySchema = new Schema<TSubCategory>({
  subCategoryName: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
})

export const SubCategory = mongoose.model('SubCategory', subCategorySchema)
