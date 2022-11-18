import { IDeleteUserUseCase } from '../../../../domain/usecases/user/delete-user'
import { UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
import { IUserRepository } from '../../../repositories/user-repository'
import { DeleteUserUseCase } from '../../user/delete-user'

interface IMakeSut {
  userRepository: IUserRepository
  sut: IDeleteUserUseCase
}

const makeSut = (): IMakeSut => {
  const userRepository = new UserRepositoryInMemory()
  const sut = new DeleteUserUseCase(userRepository)

  return {
    sut,
    userRepository
  }
}

describe('DeleteUserUseCase', () => {
  it('Should call user repository delete method with the right data', async () => {
    const { sut, userRepository } = makeSut()

    const userId = 'id'

    const userRepositorySpy = jest.spyOn(userRepository, 'delete')
    await sut.delete(userId)

    expect(userRepositorySpy).toHaveBeenCalledWith(userId)
  })

  it('Should throw if user repository delete method throws', async () => {
    const { sut, userRepository } = makeSut()

    const userId = 'id'

    jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(userId)

    await expect(promise).rejects.toThrow()
  })
})
