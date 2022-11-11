import { UserModel } from '../models/user'

export interface IAddUserData {
  name: string
  email: string
  password: string
}

export interface IAddUserUseCase {
  add: (data: IAddUserData) => Promise<UserModel>
}
