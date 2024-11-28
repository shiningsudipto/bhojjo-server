import { TProduct } from './product.interface'
import slugify from 'slugify'
import { Product } from './product.model'

const generateUniqueSlug = (title: string): string => {
  const baseSlug = slugify(`${title} bhojjo`, { lower: true })
  const timestamp = Date.now()
  return `${baseSlug}-${timestamp}`
}

const createProductIntoDB = async (payload: TProduct) => {
  const slug = generateUniqueSlug(payload.title)
  const product = {
    ...payload,
    slug,
  }
  const result = await Product.create(product)
  return result
}

const getSingleProductFromDB = async (slug: string) => {
  const isProductAvailable = await Product.findOne({ slug })
  if (!isProductAvailable) {
    throw new Error('Product not found!')
  }
  const result = await Product.findOneAndUpdate(
    { slug },
    { $inc: { view: 1 } },
    { new: true },
  )
  return result
}
const getAllProductFromDB = async () => {
  const result = await Product.find()
  return result
}
const updateProductFromDB = async (id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
}
