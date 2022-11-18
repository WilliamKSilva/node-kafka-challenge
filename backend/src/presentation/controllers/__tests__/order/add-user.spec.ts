import { OrderModel } from '../../../../domain/models/order'
import { IAddOrderData, IAddOrderUseCase } from '../../../../domain/usecases/order/add-order'
import { MissingFieldError } from '../../../errors/missing-field-error'
import { IController } from '../../../protocols/http'
import { CreateOrderController } from '../../order/add-order'

const makeAddOrderUseCaseStub = (): IAddOrderUseCase => {
  class AddOrderUseCaseStub implements IAddOrderUseCase {
    async add (data: IAddOrderData): Promise<OrderModel> {
      return await new Promise((resolve, reject) => resolve({
        id: 'id',
        name: 'test',
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

  it('Should throws if AddOrderUseCase throws', async () => {
    const { sut, addOrderUseCase } = makeSut()
    const httpRequest = {
      body: {
        name: 'test',
        description: 'test'
      }
    }

    jest.spyOn(addOrderUseCase, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.handle(httpRequest)

    await expect(promise).rejects.toThrow()
  })
})
