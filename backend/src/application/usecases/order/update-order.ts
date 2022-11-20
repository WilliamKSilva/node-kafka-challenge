import { OrderModel } from '../../../domain/models/order'
import { IUpdateOrderData, IUpdateOrderUseCase } from '../../../domain/usecases/order/update-order'
import { IOrderRepository } from '../../repositories/order-repository'

export class UpdateOrderUseCase implements IUpdateOrderUseCase {
  private readonly orderRepository: IOrderRepository

  constructor (orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async update (data: IUpdateOrderData, orderId: string): Promise<OrderModel> {
    const order = await this.orderRepository.update(data, orderId)

    return null
  }
}
