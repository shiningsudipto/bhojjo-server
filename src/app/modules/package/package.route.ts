import express from 'express'
import { packageControllers } from './package.controller'

const router = express.Router()
// package
router.post('/', packageControllers.createPackage)
router.get('/:buyerID', packageControllers.getPackageByBuyer)
router.put('/', packageControllers.updatePackage)
router.delete('/', packageControllers.deletePackage)
// package item
router.post('/item', packageControllers.createPackageItem)
router.get('/item/:packageId', packageControllers.getPackageItemByPackage)
router.put('/item', packageControllers.updatePackageItem)
router.delete('/item', packageControllers.deletePackageItem)

export const PackageRoutes = router
