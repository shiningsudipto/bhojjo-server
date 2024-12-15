import { Types } from 'mongoose'

export interface TProduct {
  title: string
  category: string
  subCategory: string
  images: string[]
  weight: number
  quantity: number
  details: string
  brand: string
  sold: number
  price: number
  purchasePrice: number
  discount: number
  adminId: Types.ObjectId
  slug: string
  view: number
}
