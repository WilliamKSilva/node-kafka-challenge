import { OrderModel, Status } from '../../../../domain/models/order'
import { IUpdateOrderData, IUpdateOrderUseCase } from '../../../../domain/usecases/order/update-order'
import { UpdateOrderController } from '../../order/update-order'

const makeUpdateOrderUseCaseStub = (): IUpdateOrderUseCase => {
  class UpdateOrderUseCaseStub implements IUpdateOrderUseCase {
    async update (data: IUpdateOrderData, orderId: string): Promise<OrderModel> {
      return await new Promise((resolve, reject) => resolve({
        id: 'id',
        name: 'test',
        description: 'test',
        status: Status.completed
      }))
    }
  }

  return new UpdateOrderUseCaseStub()
}

const makeSut = () => {
  const updateOrderUseCase = makeUpdateOrderUseCaseStub()
  const sut = new UpdateOrderController(updateOrderUseCase)

  return {
    sut,
    updateOrderUseCase
  }
}

describe('UpdateOrderController', () => {
  it('Should call UpdateOrderUseCase with the right data', async () => {
    const { sut, updateOrderUseCase } = makeSut()

    const httpRequest = {
      body: {
        name: 'test',
        description: 'test',
        status: Status.completed
      },
      params: {
        id: 'id'
      }
    }

    const updateOrderUseCaseSpy = jest.spyOn(updateOrderUseCase, 'update')
    await sut.handle(httpRequest)

    expect(updateOrderUseCaseSpy).toHaveBeenCalledWith(httpRequest.body, 'id')
  })
})
