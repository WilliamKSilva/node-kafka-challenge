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

  it('Should throw if order repository update method throws', async () => {
    const { sut, orderRepository } = makeSut()

    const data = {
      description: 'test 1'
    }

    jest.spyOn(orderRepository, 'update').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(data, 'id')

    await expect(promise).rejects.toThrow()
  })
})
