import mongoose, { Schema } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
  },
  images: [String],
  weight: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  details: String,
  sold: { type: Number, default: 0 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, required: true },
})

export const Product = mongoose.model<TProduct>('Product', productSchema)
