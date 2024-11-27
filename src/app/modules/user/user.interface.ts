/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose'

export type TUser = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
  address?: string
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByPhone(phone: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
