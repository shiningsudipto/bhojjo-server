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
