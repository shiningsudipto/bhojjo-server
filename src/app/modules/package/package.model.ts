import mongoose, { Schema } from 'mongoose'
import { TPackage, TPackageItem } from './package.interface'

const packageSchema = new Schema<TPackage>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    totalItems: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

export const Package = mongoose.model<TPackage>('Package', packageSchema)

const packageItemSchema = new Schema<TPackageItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  quantity: { type: Number, required: true },
})

export const PackageItem = mongoose.model<TPackageItem>(
  'PackageItem',
  packageItemSchema,
)
