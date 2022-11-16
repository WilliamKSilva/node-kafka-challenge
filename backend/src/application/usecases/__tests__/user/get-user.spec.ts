import { IGetUserUseCase } from '../../../../domain/usecases/user/get-user'
import { mockedUserModel, UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
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
  it('Should call user repository with right data', async () => {
    const { sut, userRepository } = makeSut()

    const id = 'id'

    const userRepositorySpy = jest.spyOn(userRepository, 'findById')
    await sut.find(id)

    expect(userRepositorySpy).toHaveBeenCalledWith('id')
  })

  it('Should throws if user repsository throws', async () => {
    const { sut, userRepository } = makeSut()

    const id = 'id'

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find(id)

    await expect(promise).rejects.toThrow()
  })

  it('Should return null if user does not exists', async () => {
    const { sut, userRepository } = makeSut()

    const id = 'id'

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(new Promise((resolve, reject) => resolve(null)))
    const user = await sut.find(id)

    expect(user).toBeFalsy()
  })

  it('Should return an user on success', async () => {
    const { sut } = makeSut()

    const id = 'id'

    const user = await sut.find(id)

    expect(user).toEqual(mockedUserModel)
  })
})
