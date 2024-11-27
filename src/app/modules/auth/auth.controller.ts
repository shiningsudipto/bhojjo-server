import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const sendOTP = catchAsync(async (req, res) => {
  const { phone } = req.body
  const result = await AuthServices.sendOtpToTheUser(phone)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP send successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { accessToken, user } = result

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    accessToken: accessToken,
    data: user,
  })
})

export const AuthControllers = {
  sendOTP,
  loginUser,
}
