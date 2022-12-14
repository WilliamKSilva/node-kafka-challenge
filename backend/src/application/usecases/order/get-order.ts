import { OrderModel } from '../../../domain/models/order'
import { IGetOrderUseCase } from '../../../domain/usecases/order/get-order'
import { OrderNotFoundError } from '../../../presentation/errors/order-not-found-error'
import { IOrderRepository } from '../../repositories/order-repository'

export class GetOrderUseCase implements IGetOrderUseCase {
  private readonly orderRepository: IOrderRepository

  constructor (orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async find (orderId: string): Promise<OrderModel> {
    const order = await this.orderRepository.find(orderId)

    if (!order) {
      throw new OrderNotFoundError()
    }

    return order
  }
}
