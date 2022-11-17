import { IDeleteUserUseCase } from '../../domain/usecases/user/delete-user'
import { InternalServerError } from '../errors/internal-server-error'
import { DeleteUserController } from './delete-user'

const makeDeleteUserUseCaseStub = () => {
  class DeleteUserUseCaseStub implements IDeleteUserUseCase {
    async delete (userId: string): Promise<void> {}
  }

  return new DeleteUserUseCaseStub()
}

const makeSut = () => {
  const deleteUserUseCase = makeDeleteUserUseCaseStub()
  const sut = new DeleteUserController(deleteUserUseCase)

  return {
    sut,
    deleteUserUseCase
  }
}

describe('DeleteUserController', () => {
  it('Should call DeleteUserUseCase with the right data', async () => {
    const { sut, deleteUserUseCase } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    const deleteUserUseCaseSpy = jest.spyOn(deleteUserUseCase, 'delete')

    await sut.handle(httpRequest)

    expect(deleteUserUseCaseSpy).toHaveBeenCalledWith('id')
  })

  it('Should return 500 if DeleteUserUseCase throws', async () => {
    const { sut, deleteUserUseCase } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    jest.spyOn(deleteUserUseCase, 'delete').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  it('Should return 204 if user is deleted', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(204)
    expect(httpResponse.body).toBeFalsy()
  })
})
