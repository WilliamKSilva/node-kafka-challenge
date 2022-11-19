import { OrderModel, Status } from '../../../../domain/models/order'
import { IGetOrderUseCase } from '../../../../domain/usecases/order/get-order'
import { IController } from '../../../protocols/http'
import { GetOrderController } from '../../order/get-order'

const makeGetOrderUseCaseStub = (): IGetOrderUseCase => {
  class GetOrderUseCaseStub implements IGetOrderUseCase {
    async find (orderId: string): Promise<OrderModel> {
      return await new Promise((resolve, reject) => resolve({
        id: 'id',
        name: 'test',
        description: 'test',
        status: Status.pending
      }))
    }
  }

  return new GetOrderUseCaseStub()
}

interface IMakeSut {
  sut: IController
  getOrderUseCase: IGetOrderUseCase
}

const makeSut = (): IMakeSut => {
  const getOrderUseCase = makeGetOrderUseCaseStub()
  const sut = new GetOrderController(getOrderUseCase)

  return {
    sut,
    getOrderUseCase
  }
}

describe('GetOrderController', () => {
  it('Should call GetOrderUseCase with the right data', async () => {
    const { sut, getOrderUseCase } = makeSut()

    const httpRequest = {
      params: {
        id: 'id'
      }
    }

    const getOrderUseCaseSpy = jest.spyOn(getOrderUseCase, 'find')
    await sut.handle(httpRequest)

    expect(getOrderUseCaseSpy).toHaveBeenCalledWith('id')
  })
})
