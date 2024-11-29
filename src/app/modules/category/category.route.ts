import express from 'express'
import { categoryControllers } from './category.controller'

const router = express.Router()

router.post('/', categoryControllers.createCategory)
router.get('/', categoryControllers.getAllCategory)
router.put('/:id', categoryControllers.updateCategory)
router.delete('/:id', categoryControllers.deleteCategory)
// sub-category
router.get('/sub-category', categoryControllers.getAllSubCategory)
router.get(
  '/sub-category/:categoryId',
  categoryControllers.getSubCategoryByCategory,
)
router.post('/sub-category', categoryControllers.createSubCategory)
router.put('/sub-category/:sCategoryId', categoryControllers.updateSubCategory)
router.delete(
  '/sub-category/:sCategoryId',
  categoryControllers.deleteSubCategory,
)

export const CategoryRoutes = router
