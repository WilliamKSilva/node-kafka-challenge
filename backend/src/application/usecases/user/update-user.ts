import { UserModel } from '../../../domain/models/user'
import { IUpdateUserData, IUpdateUserUseCase } from '../../../domain/usecases/user/update-user'
import { IUserRepository } from '../../repositories/user-repository'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async update (data: IUpdateUserData, userId: string): Promise<UserModel> {
    const user = await this.userRepository.update(data, userId)

    return null
  }
}
