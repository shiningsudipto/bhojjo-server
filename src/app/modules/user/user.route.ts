import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { userControllers } from './user.controller'

const router = express.Router()

router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)
router.get('/user-info', userControllers.getUserByEmail)
router.get('/user/:email', userControllers.getSingleUser)
router.get('/user-by-id/:id', userControllers.getUserById)

router.put('/update-user/:id', userControllers.updateUser)
router.put('/update-user-role/:id', userControllers.updateUserRole)

export const UserRoutes = router
