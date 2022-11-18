import { GetUserUseCase } from '../../application/usecases/user/get-user'
import { MongoUserRepository } from '../../infra/mongo/user-repository'
import { GetUserController } from '../../presentation/controllers/user/get-user'
import { IController } from '../../presentation/protocols/http'

export const makeGetUserController = (): IController => {
  const userRepository = new MongoUserRepository()
  const getUserUseCase = new GetUserUseCase(userRepository)
  const getUserController = new GetUserController(getUserUseCase)

  return getUserController
}
