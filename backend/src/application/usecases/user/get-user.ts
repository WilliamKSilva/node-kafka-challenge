import { UserModel } from '../../../domain/models/user'
import { IGetUserUseCase } from '../../../domain/usecases/user/get-user'
import { IUserRepository } from '../../repositories/user-repository'

export class GetUserUseCase implements IGetUserUseCase {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async find (id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return null
    }

    return user
  }
}
