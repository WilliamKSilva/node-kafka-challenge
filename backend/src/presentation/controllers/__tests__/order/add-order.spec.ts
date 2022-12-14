import { OrderModel, Status } from '../../../../domain/models/order'
import { IAddOrderData, IAddOrderUseCase } from '../../../../domain/usecases/order/add-order'
import { InternalServerError } from '../../../errors/internal-server-error'
import { MissingFieldError } from '../../../errors/missing-field-error'
import { IController } from '../../../protocols/http'
import { CreateOrderController } from '../../order/add-order'

const makeAddOrderUseCaseStub = (): IAddOrderUseCase => {
  class AddOrderUseCaseStub implements IAddOrderUseCase {
    async add (data: IAddOrderData): Promise<OrderModel> {
      return await new Promise((resolve, reject) => resolve({
        id: 'id',
        name: 'test',
        status: Status.pending,
        description: 'test'
      }))
    }
  }

  return new AddOrderUseCaseStub()
}

interface IMakeSut {
  sut: IController
  addOrderUseCase: IAddOrderUseCase
}

const makeSut = (): IMakeSut => {
  const addOrderUseCase = makeAddOrderUseCaseStub()
  const sut = new CreateOrderController(addOrderUseCase)

  return {
    sut,
    addOrderUseCase
  }
}

describe('CreateUserController', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('name'))
  })

  it('Should return 400 if no descripion is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('description'))
  })

  it('Should call AddOrderUseCase with the right data', async () => {
    const { sut, addOrderUseCase } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        description: 'test'
      }
    }

    const addOrderUseCaseSpy = jest.spyOn(addOrderUseCase, 'add')
    await sut.handle(httpRequest)

    expect(addOrderUseCaseSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 500 if AddOrderUseCase throws', async () => {
    const { sut, addOrderUseCase } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        description: 'test'
      }
    }

    jest.spyOn(addOrderUseCase, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        description: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'id',
      status: Status.pending,
      name: 'test',
      description: 'test'
    })
  })
})
