/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPackage, TPackageItem } from './package.interface'
import { Package, PackageItem } from './package.model'

const createPackageIntoDB = async (payload: TPackage) => {
  const result = await Package.create(payload)
  return result
}

const getPackageByBuyerFromDB = async (buyerId: string) => {
  const packages = await Package.find({ buyer: buyerId }).lean()

  const packageData = await Promise.all(
    packages.map(async (pkg) => {
      const packageItems = await PackageItem.find({ packageId: pkg._id })
        .populate('productId', 'price')
        .lean()

      const totalItems = packageItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      )

      const totalPrice = packageItems.reduce((sum, item) => {
        // Check if productId exists and has a price
        if (item.product && (item.product as any).price) {
          return sum + item.quantity * (item.product as any).price
        }
        return sum
      }, 0)

      return {
        ...pkg,
        totalItems,
        totalPrice,
      }
    }),
  )

  return packageData
}

const deletePackageFromDB = async (id: string) => {
  const result = await Package.findByIdAndDelete(id)
  return result
}

const updatePackageIntoDB = async (id: string, payload: TPackage) => {
  const result = await Package.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const createPackageItemIntoDB = async (payload: TPackageItem[]) => {
  const result = await PackageItem.insertMany(payload, { ordered: true })
  return result
}

const getPackageItemByBuyerFromDB = async (id: string) => {
  const result = await PackageItem.find({ packageId: id })
    .populate({
      path: 'product',
      model: 'Product',
      select: 'price title images quantity',
    })
    .populate({
      path: 'package',
      model: 'Package',
      select: 'name buyer',
    })
  return result
}

const deletePackageItemFromDB = async (id: string) => {
  const result = await PackageItem.findByIdAndDelete(id)
  return result
}

const updatePackageItemIntoDB = async (id: string, payload: TPackageItem) => {
  const result = await PackageItem.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const packageServices = {
  createPackageIntoDB,
  deletePackageFromDB,
  updatePackageIntoDB,
  createPackageItemIntoDB,
  getPackageByBuyerFromDB,
  getPackageItemByBuyerFromDB,
  deletePackageItemFromDB,
  updatePackageItemIntoDB,
}
