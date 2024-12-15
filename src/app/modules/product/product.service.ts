import { TProduct } from './product.interface'
import slugify from 'slugify'
import { Product } from './product.model'
import { FilterQuery } from 'mongoose'

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

interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const getAllProductFromDB = async (filter: ProductFilter) => {
  const { category, minPrice, maxPrice, searchTerm, sortBy, sortOrder } = filter

  const query: FilterQuery<typeof Product> = {}

  // Filter by category
  if (category) {
    query.category = category
  }

  // Filter by price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {}
    if (minPrice !== undefined) query.price.$gte = minPrice // Greater than or equal
    if (maxPrice !== undefined) query.price.$lte = maxPrice // Less than or equal
  }

  // Search by title, description, or sub-category
  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive
      { description: { $regex: searchTerm, $options: 'i' } },
      { subCategory: { $regex: searchTerm, $options: 'i' } },
    ]
  }

  // Sorting (default to ascending price)
  const sortField = sortBy === 'price' ? 'price' : 'createdAt'
  const sortDirection = sortOrder === 'desc' ? -1 : 1

  // Execute the query
  const result = await Product.find(query).sort({ [sortField]: sortDirection })

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
