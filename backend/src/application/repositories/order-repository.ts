import { OrderModel } from '../../domain/models/order'
import { IAddOrderData } from '../../domain/usecases/order/add-order'

export interface IOrderRepository {
  add: (data: IAddOrderData) => Promise<OrderModel>
}
