import { OrderModel, Status } from '../../../domain/models/order'
import { IAddOrderData } from '../../../domain/usecases/order/add-order'
import { IUpdateOrderData } from '../../../domain/usecases/order/update-order'
import { IOrderRepository } from '../order-repository'

export const mockOrder = {
  id: 'id',
  name: 'test',
  description: 'test',
  status: Status.pending
}

export class OrderRepositoryInMemory implements IOrderRepository {
  async add (data: IAddOrderData): Promise<OrderModel> {
    return mockOrder
  }

  async find (orderId: string): Promise<OrderModel> {
    return mockOrder
  }

  async update (data: IUpdateOrderData, orderId: string): Promise<OrderModel> {
    return mockOrder
  }
}
