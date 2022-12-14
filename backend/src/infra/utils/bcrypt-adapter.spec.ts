import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'
import { IEncrypter } from '../../application/protocols/encrypter'

interface IMakeSut {
  sut: IEncrypter
}

jest.mock('bcrypt', () => ({
  async hash (password: string): Promise<string> {
    return await new Promise(resolve => resolve('test_hashed'))
  }
}))

const makeSut = (): IMakeSut => {
  const sut = new BcryptAdapter()

  return {
    sut
  }
}

describe('BcryptAdapter', () => {
  it('Should call Hash method with the right data', async () => {
    const { sut } = makeSut()

    const password = 'test12345'

    const sutSpy = jest.spyOn(sut, 'encrypt')
    await sut.encrypt(password)

    expect(sutSpy).toHaveBeenCalledWith(password)
  })

  it('Should throws if Bcrypt throws', async () => {
    const { sut } = makeSut()

    const password = 'test12345'

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt(password)

    await expect(promise).rejects.toThrow()
  })

  it('Should return an hashed password on success', async () => {
    const { sut } = makeSut()

    const password = 'test12345'

    const hashed = await sut.encrypt(password)

    expect(hashed).toBe('test_hashed')
  })
})
