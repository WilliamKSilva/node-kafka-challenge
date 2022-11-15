import { UserModel } from '../../../domain/models/user'
import { IAddUserData, IAddUserUseCase } from '../../../domain/usecases/user/add-user'
import { IEncrypter } from '../../protocols/encrypter'
import { IUserRepository } from '../../repositories/user-repository'

export class AddUserUseCase implements IAddUserUseCase {
  private readonly encrypter: IEncrypter
  private readonly userRepository: IUserRepository

  constructor (encrypter: IEncrypter, userRepository: IUserRepository) {
    this.encrypter = encrypter
    this.userRepository = userRepository
  }

  async add (data: IAddUserData): Promise<UserModel> {
    const { name, email, password } = data

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      return null
    }

    const hashedPassword = await this.encrypter.encrypt(password)

    const user = await this.userRepository.add({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}
