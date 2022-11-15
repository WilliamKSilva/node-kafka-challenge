import { IFindUserByEmailUseCase } from '../../../../domain/usecases/user/find-user-by-email'
import { UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
import { IUserRepository } from '../../../repositories/user-repository'
import { FindUserByEmailUseCase } from '../../user/find-user-by-email'

interface IMakeSut {
  sut: IFindUserByEmailUseCase
  userRepositoryStub: IUserRepository
}

const makeSut = (): IMakeSut => {
  const userRepositoryStub = new UserRepositoryInMemory()
  const sut = new FindUserByEmailUseCase(userRepositoryStub)

  return {
    sut,
    userRepositoryStub
  }
}

describe('Find User By Email UseCase', () => {
  it('Should call UserRepository with the right data', async () => {
    const { sut, userRepositoryStub } = makeSut()

    const userRepositorySpy = jest.spyOn(userRepositoryStub, 'find')
    await sut.find('test@test.com')

    expect(userRepositorySpy).toHaveBeenCalledWith('test@test.com')
  })
})
