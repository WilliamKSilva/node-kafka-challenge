import { IFindUserByEmailUseCase } from '../../../../domain/usecases/user/find-user-by-email'
import { mockedUserModel, UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
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

  it('Should throws if user repository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()

    jest.spyOn(userRepositoryStub, 'find').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find('test@test.com')

    await expect(promise).rejects.toThrow()
  })

  it('Should return null if user does not exists', async () => {
    const { sut, userRepositoryStub } = makeSut()

    jest.spyOn(userRepositoryStub, 'find').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const user = await sut.find('test@test.com')

    expect(user).toBeFalsy()
  })

  it('Should return an user on success', async () => {
    const { sut } = makeSut()

    const user = await sut.find('test@test.com')

    expect(user).toEqual(mockedUserModel)
  })
})
