import { Types } from 'mongoose'

export interface TProduct {
  title: string
  category: Types.ObjectId
  subCategory: Types.ObjectId
  images: string[]
  weight: number
  quantity: number
  details: string
  sold: number
  price: number
  discount: number
  adminId: Types.ObjectId
  slug: string
}
