import mongoose, { Schema } from 'mongoose'
import { TPackage, TPackageItem } from './package.interface'

const packageSchema = new Schema<TPackage>({
  id: { type: String, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
})

export const Package = mongoose.model<TPackage>('Package', packageSchema)

const packageItemSchema = new Schema<TPackageItem>({
  id: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  quantity: { type: Number, required: true },
})

export const PackageItem = mongoose.model<TPackageItem>(
  'PackageItem',
  packageItemSchema,
)
