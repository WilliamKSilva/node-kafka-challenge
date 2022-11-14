import { IUserRepository } from '../../application/repositories/user-repository'
import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'

export class MongoUserRepository implements IUserRepository {
  async add (data: IAddUserData): Promise<UserModel> {

  }
}
