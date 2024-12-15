import mongoose, { Schema } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: {
    type: String,
  },
  images: [String],
  weight: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  details: String,
  brand: String,
  sold: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
  price: { type: Number, required: true },
  purchasePrice: { type: Number },
  discount: { type: Number, default: 0 },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String },
})

export const Product = mongoose.model<TProduct>('Product', productSchema)
