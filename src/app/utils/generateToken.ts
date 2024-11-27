import config from '../config'
import { createToken } from '../modules/auth/auth.utils'
import { TUser } from '../modules/user/user.interface'

const generateToken = (user: TUser) => {
  const jwtPayload = {
    phone: user.phone,
    role: user.role,
    id: user._id,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  return accessToken
}

export default generateToken
