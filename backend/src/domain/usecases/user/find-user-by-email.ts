import { UserModel } from '../../models/user'

export type IFindUserByEmailData = string

export interface IFindUserByEmailUseCase {
  find: (data: IFindUserByEmailData) => Promise<UserModel>
}
