import { OrderModel } from '../../models/order'

export interface IAddOrderData {
  name: string
  description: string
}

export interface IAddOrderUseCase {
  add: (data: IAddOrderData) => Promise<OrderModel>
}
