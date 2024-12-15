/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
  district: string
  address?: string
}

export type TUserRole = keyof typeof USER_ROLE

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByPhone(phone: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
