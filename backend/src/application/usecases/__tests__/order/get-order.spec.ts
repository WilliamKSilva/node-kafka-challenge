import { IGetOrderUseCase } from '../../../../domain/usecases/order/get-order'
import { OrderRepositoryInMemory } from '../../../repositories/in-memory/order-repository'
import { IOrderRepository } from '../../../repositories/order-repository'
import { GetOrderUseCase } from '../../order/get-order'

interface IMakeSut {
  sut: IGetOrderUseCase
  orderRepository: IOrderRepository
}

const makeSut = (): IMakeSut => {
  const orderRepository = new OrderRepositoryInMemory()
  const sut = new GetOrderUseCase(orderRepository)

  return {
    sut,
    orderRepository
  }
}

describe('GetOrderUseCase', () => {
  it('Should call order repository find method with the right data', async () => {
    const { sut, orderRepository } = makeSut()

    const orderId = 'id'

    const orderRepositorySpy = jest.spyOn(orderRepository, 'find')
    await sut.find(orderId)

    expect(orderRepositorySpy).toHaveBeenCalledWith(orderId)
  })

  it('Should throw if order repository find method throws', async () => {
    const { sut, orderRepository } = makeSut()

    const orderId = 'id'

    jest.spyOn(orderRepository, 'find').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find(orderId)

    await expect(promise).rejects.toThrow()
  })
})
