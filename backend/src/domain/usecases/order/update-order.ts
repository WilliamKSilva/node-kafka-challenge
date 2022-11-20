import { OrderModel, Status } from '../../models/order'

export interface IUpdateOrderData {
  name: string
  description: string
  status: Status
}

export interface IUpdateOrderUseCase {
  update: (data: IUpdateOrderData, orderId: string) => Promise<OrderModel>
}
