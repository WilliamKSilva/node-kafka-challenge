import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { IFindUserByEmailData } from '../../domain/usecases/user/find-user-by-email'

export interface IUserRepository {
  add: (data: IAddUserData) => Promise<UserModel>
  find: (data: IFindUserByEmailData) => Promise<UserModel>
}
