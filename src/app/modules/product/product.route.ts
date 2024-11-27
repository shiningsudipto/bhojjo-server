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

export const ProductRoutes = router
