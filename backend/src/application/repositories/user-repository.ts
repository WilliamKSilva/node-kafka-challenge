import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { IUpdateUserData } from '../../domain/usecases/user/update-user'

export interface IUserRepository {
  add: (data: IAddUserData) => Promise<UserModel>
  findByEmail: (email: string) => Promise<UserModel>
  findById: (id: string) => Promise<UserModel>
  update: (data: IUpdateUserData, userId: string) => Promise<UserModel>
  delete: (userId: string) => Promise<void>
}
