import { TLoginUser } from './auth.interface'
import { User } from '../user/user.model'
import axios from 'axios'
import generateOTP from '../../utils/generateOTP'
import generateToken from '../../utils/generateToken'

const sendOtpToTheUser = async (phone: string) => {
  // BulkSMS API credentials and message content
  const apiKey = 'eviJEhDs5cRxVrkAutV7'
  const senderId = '8809617622658'
  const message = generateOTP()

  // API URL and body
  const url = 'http://bulksmsbd.net/api/smsapi'
  const body = {
    api_key: apiKey,
    senderid: senderId,
    number: phone,
    message: `Your Bhojjo login OTP: ${message}`,
  }

  try {
    // Send POST request to the BulkSMS API
    const response = await axios.post(url, body)
    if (response.data.response_code == 202) {
      return {
        otp: message,
      }
    }
    if (response.data.response_code != 202) {
      throw new Error('Failed to send OTP')
    }
  } catch (error) {
    throw new Error('Error sending OTP to the user')
  }
}

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByPhone(payload.phone)
  if (!user) {
    const result = await User.create(payload)
    return {
      accessToken: generateToken(user),
      result,
    }
  }
  return {
    accessToken: generateToken(user),
    user,
  }
}

export const AuthServices = {
  sendOtpToTheUser,
  loginUser,
}
