import { OrderModel, Status } from '../../../domain/models/order'
import { IAddOrderData } from '../../../domain/usecases/order/add-order'
import { IOrderRepository } from '../order-repository'

export const mockOrder = {
  id: 'id',
  name: 'test',
  description: 'test',
  status: Status.pending
}

export class OrderRepositoryInMemomry implements IOrderRepository {
  async add (data: IAddOrderData): Promise<OrderModel> {
    return mockOrder
  }
}
