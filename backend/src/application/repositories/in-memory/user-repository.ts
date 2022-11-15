import { UserModel } from '../../../domain/models/user'
import { IAddUserData } from '../../../domain/usecases/user/add-user'
import { IFindUserByEmailData } from '../../../domain/usecases/user/find-user-by-email'
import { IUserRepository } from '../user-repository'

const mockedUserModel: UserModel = {
  id: 'id',
  name: 'test',
  email: 'test@test.com',
  password: 'test_hash'
}

export class UserRepositoryInMemory implements IUserRepository {
  async add (data: IAddUserData): Promise<UserModel> {
    return mockedUserModel
  }

  async find (data: IFindUserByEmailData): Promise<UserModel> {
    return mockedUserModel
  }
}
