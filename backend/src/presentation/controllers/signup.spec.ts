import { MissingFieldError } from '../utils/missing-field-error'
import { SignUpController } from './signup'

const makeSut = () => {
  const sut = new SignUpController()

  return {
    sut
  }
}

describe('SignUp Controller', () => {
  it('Should call handle method with the right data', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      }
    }

    const sutSpy = jest.spyOn(sut, 'handle')
    await sut.handle(httpRequest)

    expect(sutSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('Should check if email field is not empty', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'test@teste.com',
        password: 'test12345'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('email'))
  })

  it('Should check if name field is not empty', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'test@test.com',
        password: 'test12345'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('name'))
  })

  it('Should check if password field is not empty', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'test@test.com',
        name: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('password'))
  })
})
