import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'

export interface IUserRepository {
  add: (data: IAddUserData) => Promise<UserModel>
  findByEmail: (email: string) => Promise<UserModel>
}
