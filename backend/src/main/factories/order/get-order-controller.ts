import { GetOrderUseCase } from '../../../application/usecases/order/get-order'
import { MongoOrderRepository } from '../../../infra/mongo/order-repository'
import { GetOrderController } from '../../../presentation/controllers/order/get-order'
import { IController } from '../../../presentation/protocols/http'

export const makeGetOrderController = (): IController => {
  const orderRepository = new MongoOrderRepository()
  const getOrderUseCase = new GetOrderUseCase(orderRepository)
  const getOrderController = new GetOrderController(getOrderUseCase)
  return getOrderController
}
