import express from 'express'
import { AuthControllers } from './auth.controller'
import { userControllers } from '../user/user.controller'

const router = express.Router()

router.post('/otp', AuthControllers.sendOTP)

router.post('/login', AuthControllers.loginUser)

router.post('/registration', userControllers.createUser)

export const AuthRoutes = router
