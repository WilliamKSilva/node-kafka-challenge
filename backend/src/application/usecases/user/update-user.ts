import { UserModel } from '../../../domain/models/user'
import { IUpdateUserData, IUpdateUserUseCase } from '../../../domain/usecases/user/update-user'
import { UserNotFoundError } from '../../../presentation/errors/user-not-found-error'
import { IUserRepository } from '../../repositories/user-repository'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async update (data: IUpdateUserData, userId: string): Promise<UserModel> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const user = await this.userRepository.update(data, userId)

    return user
  }
}
