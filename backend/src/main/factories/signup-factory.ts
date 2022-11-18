import { AddUserUseCase } from '../../application/usecases/user/add-user'
import { MongoUserRepository } from '../../infra/mongo/user-repository'
import { BcryptAdapter } from '../../infra/utils/bcrypt-adapter'
import { SignUpController } from '../../presentation/controllers/user/signup'
import { IController } from '../../presentation/protocols/http'

export const makeSignUpHandler = (): IController => {
  const encrypter = new BcryptAdapter()
  const userRepository = new MongoUserRepository()
  const addUserUseCase = new AddUserUseCase(encrypter, userRepository)
  const signUpController = new SignUpController(addUserUseCase)

  return signUpController
}
