import { OrderRepositoryInMemory } from '../../../repositories/in-memory/order-repository'
import { UpdateOrderUseCase } from '../../order/update-order'

const makeSut = () => {
  const orderRepository = new OrderRepositoryInMemory()
  const sut = new UpdateOrderUseCase(orderRepository)

  return {
    sut,
    orderRepository
  }
}

describe('', () => {
  it('Should call order repository update method with the right data', async () => {
    const { sut, orderRepository } = makeSut()

    const data = {
      description: 'test 1'
    }

    const orderRepositorySpy = jest.spyOn(orderRepository, 'update')
    await sut.update(data, 'id')

    expect(orderRepositorySpy).toHaveBeenCalledWith(data, 'id')
  })
})
