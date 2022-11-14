import { BcryptAdapter } from './bcrypt-adapter'

const makeSut = () => {
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
})
