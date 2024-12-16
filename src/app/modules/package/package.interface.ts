import { Types } from 'mongoose'

export interface TPackage {
  id: string
  buyer: Types.ObjectId
  name: string
  totalItems: number
}

export interface TPackageItem {
  id: string
  product: Types.ObjectId
  package: Types.ObjectId
  quantity: number
}
