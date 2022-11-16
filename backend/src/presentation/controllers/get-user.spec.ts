import { mockedUserModel } from '../../application/repositories/in-memory/user-repository'
import { UserModel } from '../../domain/models/user'
import { IGetUserUseCase } from '../../domain/usecases/user/get-user'
import { InternalServerError } from '../errors/internal-server-error'
import { GetUserController } from './get-user'

interface IMakeSut {
  sut: GetUserController
  getUserUseCaseStub: IGetUserUseCase
}

const makeGetUserUseCaseStub = (): IGetUserUseCase => {
  class GetUserUseCaseStub implements IGetUserUseCase {
    async find (id: string): Promise<UserModel> {
      return await new Promise(resolve => resolve(mockedUserModel))
    }
  }

  return new GetUserUseCaseStub()
}

const makeSut = (): IMakeSut => {
  const getUserUseCaseStub = makeGetUserUseCaseStub()
  const sut = new GetUserController(getUserUseCaseStub)

  return {
    sut,
    getUserUseCaseStub
  }
}

describe('GetUserController', () => {
  it('Should call GetUserUseCase with right data', async () => {
    const { sut, getUserUseCaseStub } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    const getUserUseCaseSpy = jest.spyOn(getUserUseCaseStub, 'find')
    await sut.handle(httpRequest)

    expect(getUserUseCaseSpy).toHaveBeenCalledWith('id')
  })

  it('Should return an error if get user use case throws', async () => {
    const { sut, getUserUseCaseStub } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    jest.spyOn(getUserUseCaseStub, 'find').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })
})