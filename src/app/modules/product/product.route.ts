import express from 'express'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import { productController } from './product.controller'

const router = express.Router()

router.post(
  '/',
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  productController.createPost,
)
router.get('/', productController.getAllProduct)
router.get('/:slug', productController.getSingleProduct)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.updateProduct)

export const ProductRoutes = router
