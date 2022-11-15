import { UserModel } from '../../models/user'

export interface IGetUserUseCase {
  find: (id: string) => Promise<UserModel>
}
