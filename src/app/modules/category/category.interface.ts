import { Types } from 'mongoose'

export interface TCategory {
  id?: string // Primary Key
  category: string
}

export interface TSubCategory {
  id?: string // Primary Key
  subCategory: string
  category: Types.ObjectId
}
