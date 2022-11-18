import { mockedUserModel } from '../../../application/repositories/in-memory/user-repository'
import { UserModel } from '../../../domain/models/user'
import { IAddUserData } from '../../../domain/usecases/user/add-user'
import { IUpdateUserUseCase } from '../../../domain/usecases/user/update-user'
import { InternalServerError } from '../../errors/internal-server-error'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { IController } from '../../protocols/http'
import { UpdateUserController } from '../user/update-user'

interface IMakeSut {
  sut: IController
  updateUserUseCase: IUpdateUserUseCase
}

const makeUpdateUserUseCaseStub = (): IUpdateUserUseCase => {
  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async update (data: IAddUserData): Promise<UserModel> {
      return {
        id: 'id',
        name: 'test',
        email: 'test@test.com',
        password: 'test_hash'
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

  it('Should return 500 if UpdateUserUseCase throws', async () => {
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
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  it('Should return 401 if user was not found', async () => {
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

    jest.spyOn(updateUserUseCase, 'update').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new UserNotFoundError())))
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(401)
    expect(httpResponse.body).toEqual(new UserNotFoundError())
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
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

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(200)
    expect(httpResponse.body).toEqual(mockedUserModel)
  })
})
