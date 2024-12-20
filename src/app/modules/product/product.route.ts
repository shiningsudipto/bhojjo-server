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
router.get('/all', productController.getAllProductForAdmin)
router.get('/:slug', productController.getSingleProduct)
router.delete('/', productController.deleteProduct)
router.put(
  '/:id',
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  productController.updateProduct,
)

export const ProductRoutes = router
