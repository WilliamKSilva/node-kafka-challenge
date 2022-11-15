import { IAddUserUseCase } from '../../../../domain/usecases/user/add-user'
import { IEncrypter } from '../../../protocols/encrypter'
import { UserRepositoryInMemory } from '../../../repositories/in-memory/user-repository'
import { IUserRepository } from '../../../repositories/user-repository'
import { AddUserUseCase } from '../../user/add-user'

interface IMakeSut {
  sut: IAddUserUseCase
  encrypter: IEncrypter
  userRepository: IUserRepository
}

const makeEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (password: string): Promise<string> {
      return await new Promise(resolve => resolve('test_hash'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): IMakeSut => {
  const encrypter = makeEncrypterStub()
  const userRepository = new UserRepositoryInMemory()
  const sut = new AddUserUseCase(encrypter, userRepository)

  return {
    sut,
    encrypter,
    userRepository
  }
}

describe('AddUserUseCase', () => {
  it('Should call encrypter with the right data', async () => {
    const { sut, encrypter } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test12345',
      email: 'test@test.com'
    }

    const encrypterSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.add(addUserData)

    expect(encrypterSpy).toHaveBeenCalledWith('test12345')
  })

  it('Should throws if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test12345',
      email: 'test@test.com'
    }

    jest.spyOn(encrypter, 'encrypt').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(addUserData)

    await expect(promise).rejects.toThrow()
  })

  it('Should call user repository with right data', async () => {
    const { sut, userRepository } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test',
      email: 'test@test.com'
    }

    const userRepositorySpy = jest.spyOn(userRepository, 'add')
    await sut.add(addUserData)

    expect(userRepositorySpy).toHaveBeenCalledWith({
      name: 'test',
      password: 'test_hash',
      email: 'test@test.com'
    })
  })

  it('Should throws if user repository throws', async () => {
    const { sut, userRepository } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test_hash',
      email: 'test@test.com'
    }

    jest.spyOn(userRepository, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(addUserData)

    await expect(promise).rejects.toThrow()
  })

  it('Should return an user on success', async () => {
    const { sut } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test_hash',
      email: 'test@test.com'
    }

    const user = await sut.add(addUserData)

    expect(user).toEqual({
      id: 'id',
      name: 'test',
      email: 'test@test.com',
      password: 'test_hash'
    })
  })
})
