import { UserModel } from '../../../domain/models/user'
import { IAddUserData } from '../../../domain/usecases/user/add-user'
import { IUpdateUserData } from '../../../domain/usecases/user/update-user'
import { IUserRepository } from '../user-repository'

export const mockedUserModel: UserModel = {
  id: 'id',
  name: 'test',
  email: 'test@test.com',
  password: 'test_hash'
}

export class UserRepositoryInMemory implements IUserRepository {
  async add (data: IAddUserData): Promise<UserModel> {
    return mockedUserModel
  }

  async findByEmail (email: string): Promise<UserModel> {
    return mockedUserModel
  }

  async findById (id: string): Promise<UserModel> {
    return mockedUserModel
  }

  async update (data: IUpdateUserData, userId: string): Promise<UserModel> {
    return mockedUserModel
  }
}
