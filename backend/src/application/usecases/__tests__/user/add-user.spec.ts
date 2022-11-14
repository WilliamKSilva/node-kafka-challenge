import { IAddUserUseCase } from '../../../../domain/usecases/user/add-user'
import { BcryptAdapter } from '../../../../infra/utils/bcrypt-adapter'
import { IEncrypter } from '../../../protocols/encrypter'
import { IUserRepository } from '../../../repositories/user-repository'
import { AddUserUseCase } from '../../user/add-user'

interface IMakeSut {
  sut: IAddUserUseCase
  encrypter: IEncrypter
  userRepository: IUserRepository
}

const makeSut = (): IMakeSut => {
  const encrypter = new BcryptAdapter()
  const sut = new AddUserUseCase(encrypter)

  return {
    sut,
    encrypter
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
    const { sut } = makeSut()

    const addUserData = {
      name: 'test',
      password: 'test12345',
      email: 'test@test.com'
    }

    jest.spyOn(encrypter, 'encrypt').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(addUserData)

    await expect(promise).rejects.toThrow()
  })
})
