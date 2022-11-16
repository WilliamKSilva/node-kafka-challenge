import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { IUpdateUserUseCase } from '../../domain/usecases/user/update-user'
import { IController } from '../protocols/http'
import { UpdateUserController } from './update-user'

interface IMakeSut {
  sut: IController
  updateUserUseCase: IUpdateUserUseCase
}

const makeUpdateUserUseCaseStub = (): IUpdateUserUseCase => {
  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async update (data: IAddUserData): Promise<UserModel> {
      return {
        id: 'id_test',
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      }
    }
  }

  return new UpdateUserUseCaseStub()
}

const makeSut = (): IMakeSut => {
  const updateUserUseCase = makeUpdateUserUseCaseStub()

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

  it('Should call UpdateUserUseCase with the right data', async () => {
    const { sut, updateUserUseCase } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      },
      params: {
        id: 'id_test'
      }
    }

    const updateUserUseCaseSpy = jest.spyOn(updateUserUseCase, 'update')
    await sut.handle(httpRequest)

    expect(updateUserUseCaseSpy).toHaveBeenCalledWith(httpRequest.body, httpRequest.params)
  })

  it('Should throws if UpdateUserUseCase throws', async () => {
    const { sut, updateUserUseCase } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      },
      params: {
        id: 'id_test'
      }
    }

    jest.spyOn(updateUserUseCase, 'update').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.handle(httpRequest)

    await expect(promise).rejects.toThrow()
  })
})
