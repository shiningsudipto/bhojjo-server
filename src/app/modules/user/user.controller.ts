/* eslint-disable @typescript-eslint/no-explicit-any */
import { userServices } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { getUserInfoFromToken } from '../../utils/getUserInfoFromToken'
import { User } from './user.model'
import { TUser } from './user.interface'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await userServices.createUserIntoDb(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const result = await User.find()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})
const getUserByEmail = catchAsync(async (req, res) => {
  const token = req.headers.authorization
  const { email } = getUserInfoFromToken(token as string)
  const result = await userServices.getUserFromDB(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})
const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await userServices.getUserByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})
const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params
  const result = await userServices.getUserFromDB(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const userInfo = req.body
  const files = req.files as { avatar?: Express.Multer.File[] }
  const userAvatar = files?.avatar?.[0]?.path

  const updatedUserData: Partial<TUser> = {
    ...userInfo,
    ...(userAvatar ? { avatar: userAvatar } : {}), // Only include avatar if it exists
  }
  const result = await userServices.updateUserIntoDB(id, updatedUserData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})
const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params
  const userInfo = req.body
  const result = await userServices.updateUserIntoDB(id, userInfo)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

export const userControllers = {
  createUser,
  getAllUser,
  getUserByEmail,
  getUserById,
  getSingleUser,
  updateUser,
  updateUserRole,
}
