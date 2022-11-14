import { UserModel } from '../../../domain/models/user'
import { IAddUserData, IAddUserUseCase } from '../../../domain/usecases/user/add-user'
import { IEncrypter } from '../../protocols/encrypter'

export class AddUserUseCase implements IAddUserUseCase {
  private readonly encrypter: IEncrypter

  constructor (encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add (data: IAddUserData): Promise<UserModel> {
    const { name, email, password } = data

    const hashed = await this.encrypter.encrypt(password)

    return await new Promise(resolve => resolve({
      id: 'id',
      name: 'teste',
      email: 'test@test.com',
      password: 'test12345'
    }))
  }
}
