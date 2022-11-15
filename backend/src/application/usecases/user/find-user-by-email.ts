import { UserModel } from '../../../domain/models/user'
import { IFindUserByEmailData, IFindUserByEmailUseCase } from '../../../domain/usecases/user/find-user-by-email'
import { IUserRepository } from '../../repositories/user-repository'

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async find (data: IFindUserByEmailData): Promise<UserModel> {
    const user = await this.userRepository.find(data)

    return null
  }
}
