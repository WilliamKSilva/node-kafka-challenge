import { OrderModel } from '../../../domain/models/order'
import { IAddOrderData, IAddOrderUseCase } from '../../../domain/usecases/order/add-order'
import { IOrderRepository } from '../../repositories/order-repository'

export class AddOrderUseCase implements IAddOrderUseCase {
  private readonly orderRepository: IOrderRepository

  constructor (orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async add (data: IAddOrderData): Promise<OrderModel> {
    const order = await this.orderRepository.add(data)

    return null
  }
}
