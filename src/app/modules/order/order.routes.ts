import express from 'express'
import { orderControllers } from './order.controller'

const router = express.Router()
// order
router.post('/', orderControllers.createOrder)
router.post('/collection', orderControllers.createOrderByCollection)
router.get('/:id', orderControllers.getOrderByUser)
router.get('/', orderControllers.getAllOrders)
router.put('/:id', orderControllers.updateOrder)
router.get('/info/:id', orderControllers.getOrderInfo)

export const OrderRoutes = router
