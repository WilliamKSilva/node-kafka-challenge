import { IDeleteUserUseCase } from '../../domain/usecases/user/delete-user'
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
})
