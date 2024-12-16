import config from '../config'
import { createToken } from '../modules/auth/auth.utils'
import { TUser } from '../modules/user/user.interface'

const generateToken = (user: TUser) => {
  // Start with base payload
  const jwtPayload: {
    phone: string
    role: string
    id: string
    name?: string // Optional name field
  } = {
    phone: user.phone,
    role: user.role,
    id: user._id,
  }

  // Conditionally include 'name' if it exists
  if (user.name) {
    jwtPayload.name = user.name
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return accessToken
}

export default generateToken
