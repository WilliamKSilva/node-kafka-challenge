
import { IUpdateUserUseCase } from '../../../../domain/usecases/user/update-user'
import { UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
import { IUserRepository } from '../../../repositories/user-repository'
import { UpdateUserUseCase } from '../../user/update-user'

interface IMakeSut {
  sut: IUpdateUserUseCase
  userRepository: IUserRepository
}

const makeSut = (): IMakeSut => {
  const userRepository = new UserRepositoryInMemory()
  const sut = new UpdateUserUseCase(userRepository)

  return {
    sut,
    userRepository
  }
}

describe('UpdateUserUseCase', () => {
  it('Should call sut update method with right data', async () => {
    const { sut } = makeSut()

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    }

    const userId = 'id'

    const sutSpy = jest.spyOn(sut, 'update')
    await sut.update(userData, userId)

    expect(sutSpy).toHaveBeenCalledWith(userData, userId)
  })
})
