import express from 'express'
import { orderControllers } from './order.controller'
import { parseBody } from '../../middlewares/bodyParser'

const router = express.Router()
// order
router.post('/', parseBody, orderControllers.createOrder)

export const OrderRoutes = router
