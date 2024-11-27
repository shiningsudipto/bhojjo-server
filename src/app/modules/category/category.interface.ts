import { Types } from 'mongoose'

export interface TCategory {
  id?: string // Primary Key
  categoryName: string
}

export interface TSubCategory {
  id?: string // Primary Key
  subCategoryName: string
  category: Types.ObjectId
}
