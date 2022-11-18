import { DeleteUserUseCase } from '../../application/usecases/user/delete-user'
import { MongoUserRepository } from '../../infra/mongo/user-repository'
import { DeleteUserController } from '../../presentation/controllers/user/delete-user'
import { IController } from '../../presentation/protocols/http'

export const makeDeleteUserController = (): IController => {
  const userRepository = new MongoUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)
  const deleteUserController = new DeleteUserController(deleteUserUseCase)

  return deleteUserController
}
