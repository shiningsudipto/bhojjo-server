/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPackage, TPackageItem } from './package.interface'
import { Package, PackageItem } from './package.model'

const createPackageIntoDB = async (payload: TPackage) => {
  const result = await Package.create(payload)
  return result
}

const getPackageByBuyerFromDB = async (buyerId: string) => {
  const packages = await Package.find({ buyer: buyerId })

  // Fetch and calculate totals for each package
  const updatedPackages = await Promise.all(
    packages.map(async (pkg) => {
      const packageItems = await PackageItem.find({ package: pkg._id })
        .populate('product', 'price discount')
        .lean()

      // Calculate totalItems
      const totalItems = packageItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      )

      // Calculate totalPrice
      const totalPrice = packageItems.reduce((sum, item) => {
        const product = item.product as any
        const price = product.discount
          ? product.price * (1 - product.discount / 100)
          : product.price

        return Math.ceil(sum + item.quantity * price)
      }, 0)

      // Add the calculated values to the package
      return {
        ...pkg.toObject(),
        totalItems,
        totalPrice,
      }
    }),
  )

  return updatedPackages
}

const deletePackageFromDB = async (id: string) => {
  await Package.findByIdAndDelete(id)
  await PackageItem.findOneAndDelete({ package: id })
  return
}

const updatePackageIntoDB = async (id: string, payload: TPackage) => {
  const result = await Package.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

// const createPackageItemIntoDB = async (payload: TPackageItem[]) => {
//   const result = await PackageItem.insertMany(payload, { ordered: true })
//   return result
// }

const createPackageItemIntoDB = async (payload: TPackageItem) => {
  console.log(payload)
  const result = await PackageItem.create(payload)

  await Package.findByIdAndUpdate(
    payload.package,
    { $inc: { totalItems: 1 } },
    { new: true },
  )

  return result
}

const getPackageItemByBuyerFromDB = async (id: string) => {
  const result = await PackageItem.find({ package: id }).populate({
    path: 'product',
    model: 'Product',
    select: 'price title images quantity',
  })
  // .populate({
  //   path: 'package',
  //   model: 'Package',
  //   select: 'name buyer',
  // })
  return result
}

const deletePackageItemFromDB = async (id: string) => {
  const result = await PackageItem.findByIdAndDelete(id)
  return result
}

const updatePackageItemIntoDB = async (payload: TPackageItem) => {
  const result = await PackageItem.findByIdAndUpdate(payload.id, payload, {
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
