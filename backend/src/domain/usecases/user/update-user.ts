import { UserModel } from '../../models/user'

export interface IUpdateUserData {
  name?: string
  email?: string
  password?: string
}

export interface IUpdateUserUseCase {
  update: (data: IUpdateUserData, userId: string) => Promise<UserModel>
}
