import { TPackage, TPackageItem } from './package.interface'
import { Package, PackageItem } from './package.model'

const createPackageIntoDB = async (payload: TPackage) => {
  const result = await Package.create(payload)
  return result
}

const getPackageByBuyerFromDB = async (id: string) => {
  const result = await Package.find({ buyer: id })
  return result
}

const createPackageItemIntoDB = async (payload: TPackageItem[]) => {
  const result = await PackageItem.insertMany(payload, { ordered: true })
  return result
}

const getPackageItemByBuyerFromDB = async (id: string) => {
  const result = await PackageItem.find({ packageId: id })
  return result
}

export const packageServices = {
  createPackageIntoDB,
  createPackageItemIntoDB,
  getPackageByBuyerFromDB,
  getPackageItemByBuyerFromDB,
}
