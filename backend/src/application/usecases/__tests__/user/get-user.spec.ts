import { IGetUserUseCase } from '../../../../domain/usecases/user/get-user'
import { UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
import { IUserRepository } from '../../../repositories/user-repository'
import { GetUserUseCase } from '../../user/get-user'

interface IMakeSut {
  sut: IGetUserUseCase
  userRepository: IUserRepository
}

const makeSut = (): IMakeSut => {
  const userRepository = new UserRepositoryInMemory()
  const sut = new GetUserUseCase(userRepository)

  return {
    sut,
    userRepository
  }
}

describe('GetUserUseCase', () => {
  it('Should call user repsository with right data', async () => {
    const { sut, userRepository } = makeSut()

    const id = 'id'

    const userRepositorySpy = jest.spyOn(userRepository, 'findById')
    await sut.find(id)

    expect(userRepositorySpy).toHaveBeenCalledWith('id')
  })
})
