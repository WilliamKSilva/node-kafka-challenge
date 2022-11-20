import { OrderModel } from '../../domain/models/order'
import { IAddOrderData } from '../../domain/usecases/order/add-order'
import { IUpdateOrderData } from '../../domain/usecases/order/update-order'

export interface IOrderRepository {
  add: (data: IAddOrderData) => Promise<OrderModel>
  find: (orderId: string) => Promise<OrderModel>
  update: (data: IUpdateOrderData, orderId: string) => Promise<OrderModel>
}
