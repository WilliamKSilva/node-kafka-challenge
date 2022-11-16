import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { IUpdateUserUseCase } from '../../domain/usecases/user/update-user'
import { IController } from '../protocols/http'
import { UpdateUserController } from './update-user'

interface IMakeSut {
  sut: IController
  updateUserUseCase: IUpdateUserUseCase
}

const makeUpdateUserUseCase = (): IUpdateUserUseCase => {
  class UpdateUserUseCase implements IUpdateUserUseCase {
    async update (data: IAddUserData): Promise<UserModel> {
      return {
        id: 'id_test',
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      }
    }
  }

  return new UpdateUserUseCase()
}

const makeSut = (): IMakeSut => {
  const updateUserUseCase = makeUpdateUserUseCase()

  const sut = new UpdateUserController(updateUserUseCase)

  return {
    sut,
    updateUserUseCase
  }
}

describe('SignUp Controller', () => {
  it('Should call handle method with the right data', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      }
    }

    const sutSpy = jest.spyOn(sut, 'handle')
    await sut.handle(httpRequest)

    expect(sutSpy).toHaveBeenCalledWith(httpRequest)
  })
})
