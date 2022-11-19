import { OrderModel } from '../../models/order'

export interface IGetOrderUseCase {
  find: (orderId: string) => Promise<OrderModel>
}
