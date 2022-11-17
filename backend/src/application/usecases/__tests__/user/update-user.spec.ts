
import { IUpdateUserUseCase } from '../../../../domain/usecases/user/update-user'
import { UserNotFoundError } from '../../../../presentation/errors/user-not-found-error'
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
  it('Should call user repository update method with the right data', async () => {
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

  it('Should throws if user repository update method throws', async () => {
    const { sut, userRepository } = makeSut()

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    }

    const userId = 'id'

    jest.spyOn(userRepository, 'update').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(userData, userId)

    await expect(promise).rejects.toThrow()
  })

  it('Should throws user not found error if user repository returns nothing', async () => {
    const { sut, userRepository } = makeSut()

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    }

    const userId = 'id'

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(new Promise((resolve, reject) => resolve(null)))
    const promise = sut.update(userData, userId)

    await expect(promise).rejects.toEqual(new UserNotFoundError())
  })

  it('Should call user repository update method with the right data', async () => {
    const { sut, userRepository } = makeSut()

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    }

    const userId = 'id'

    const userRepositorySpy = jest.spyOn(userRepository, 'update')
    await sut.update(userData, userId)

    expect(userRepositorySpy).toHaveBeenCalledWith(userData, userId)
  })

  it('Should throws if user repository findById method throws', async () => {
    const { sut, userRepository } = makeSut()

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    }

    const userId = 'id'

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(userData, userId)

    await expect(promise).rejects.toThrow()
  })
})
