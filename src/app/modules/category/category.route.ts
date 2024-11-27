import express from 'express'
import { categoryControllers } from './category.controller'

const router = express.Router()

router.post('/category', categoryControllers.createCategory)
router.get('/category', categoryControllers.getAllCategory)
router.put('/category/:id', categoryControllers.updateCategory)
router.put('/category/:id', categoryControllers.deleteCategory)

export const UserRoutes = router
