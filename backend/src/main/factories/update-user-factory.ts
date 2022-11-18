
import { UpdateUserUseCase } from '../../application/usecases/user/update-user'
import { MongoUserRepository } from '../../infra/mongo/user-repository'
import { UpdateUserController } from '../../presentation/controllers/user/update-user'
import { IController } from '../../presentation/protocols/http'

export const makeUpdateUserController = (): IController => {
  const userRepository = new MongoUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  const updateUserController = new UpdateUserController(updateUserUseCase)

  return updateUserController
}
