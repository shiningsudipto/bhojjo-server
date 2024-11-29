import express from 'express'
import { packageControllers } from './package.controller'

const router = express.Router()
// package
router.post('/', packageControllers.createPackage)
router.get('/:buyerID', packageControllers.getPackageByBuyer)
router.put('/:packageId', packageControllers.getPackageByBuyer)
router.delete('/:packageId', packageControllers.getPackageByBuyer)
// package item
router.post('/item', packageControllers.createPackageItem)
router.get('/item/:packageId', packageControllers.getPackageItemByPackage)
router.put('/item/:packageItemId', packageControllers.getPackageItemByPackage)
router.delete(
  '/item/:packageItemId',
  packageControllers.getPackageItemByPackage,
)

export const PackageRoutes = router
