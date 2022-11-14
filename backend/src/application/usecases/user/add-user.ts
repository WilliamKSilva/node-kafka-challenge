import { UserModel } from '../../../domain/models/user'
import { IAddUserData, IAddUserUseCase } from '../../../domain/usecases/user/add-user'

export class AddUserUseCase implements IAddUserUseCase {
  async add (data: IAddUserData): Promise<UserModel> {
    return await new Promise(resolve => resolve({
      id: 'id',
      name: 'teste',
      email: 'test@test.com',
      password: 'test12345'
    }))
  }
}
