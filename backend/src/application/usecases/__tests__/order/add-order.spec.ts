import { IAddOrderUseCase } from '../../../../domain/usecases/order/add-order'
import { OrderRepositoryInMemomry } from '../../../repositories/in-memory/order-repository'
import { IOrderRepository } from '../../../repositories/order-repository'
import { AddOrderUseCase } from '../../order/add-order'

interface IMakeSut {
  sut: IAddOrderUseCase
  orderRepository: IOrderRepository
}

const makeSut = (): IMakeSut => {
  const orderRepository = new OrderRepositoryInMemomry()
  const sut = new AddOrderUseCase(orderRepository)

  return {
    sut,
    orderRepository
  }
}

describe('AddOrderUseCase', () => {
  it('Should call order repository add method with the right data', async () => {
    const { sut, orderRepository } = makeSut()

    const orderData = {
      name: 'test',
      description: 'test'
    }

    const orderRepositorySpy = jest.spyOn(orderRepository, 'add')
    await sut.add(orderData)

    expect(orderRepositorySpy).toHaveBeenCalledWith(orderData)
  })
})
