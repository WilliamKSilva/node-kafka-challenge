import { UserModel } from '../../domain/models/user'
import { IAddUserData, IAddUserUseCase } from '../../domain/usecases/user/add-user'
import { IController } from '../protocols/http'
import { MissingFieldError } from '../errors/missing-field-error'
import { SignUpController } from './signup'
import { UserAlreadyExistsError } from '../errors/forbiden-error'

interface IMakeSut {
  sut: IController
  addUserUseCaseStub: IAddUserUseCase
}

const makeAddUserUseCaseStub = (): IAddUserUseCase => {
  class AddUserUseCaseStub implements IAddUserUseCase {
    async add (data: IAddUserData): Promise<UserModel> {
      return {
        id: 'id_test',
        name: 'test',
        email: 'test@test.com',
        password: 'test12345'
      }
    }
  }

  return new AddUserUseCaseStub()
}

const makeSut = (): IMakeSut => {
  const addUserUseCaseStub = makeAddUserUseCaseStub()

  const sut = new SignUpController(addUserUseCaseStub)

  return {
    sut,
    addUserUseCaseStub
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

  it('Should call AddUserUseCase with the right data', async () => {
    const { sut, addUserUseCaseStub } = makeSut()

    const httpRequest = {
      body: {
        email: 'test@test.com',
        password: 'test12345',
        name: 'test'
      }
    }

    const addUserUseCaseSpy = jest.spyOn(addUserUseCaseStub, 'add')
    await sut.handle(httpRequest)

    expect(addUserUseCaseSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return an error if user already exists', async () => {
    const { sut, addUserUseCaseStub } = makeSut()

    const httpRequest = {
      body: {
        email: 'test@test.com',
        name: 'test',
        password: 'test12345'
      }
    }

    jest.spyOn(addUserUseCaseStub, 'add').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new UserAlreadyExistsError())
  })

  it('Should return an User on success', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'test@test.com',
        password: 'test12345',
        name: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'id_test',
      name: 'test',
      email: 'test@test.com',
      password: 'test12345'
    })
  })
})
