import { Types } from 'mongoose'

export interface TPackage {
  id: string
  buyer: Types.ObjectId
  name: string
}

export interface TPackageItem {
  id: string
  productId: Types.ObjectId
  packageId: Types.ObjectId
  quantity: number
}
