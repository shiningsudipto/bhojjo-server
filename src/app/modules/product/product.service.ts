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

export const productServices = {
  createProductIntoDB,
}
