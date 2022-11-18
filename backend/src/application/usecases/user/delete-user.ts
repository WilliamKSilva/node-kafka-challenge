import { IDeleteUserUseCase } from '../../../domain/usecases/user/delete-user'
import { IUserRepository } from '../../repositories/user-repository'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async delete (userId: string): Promise<void> {
    return await this.userRepository.delete(userId)
  }
}
