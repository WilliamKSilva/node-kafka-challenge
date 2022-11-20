import { UpdateOrderUseCase } from '../../../application/usecases/order/update-order'
import { MongoOrderRepository } from '../../../infra/mongo/order-repository'
import { UpdateOrderController } from '../../../presentation/controllers/order/update-order'
import { IController } from '../../../presentation/protocols/http'

export const makeUpdateOrderController = (): IController => {
  const orderRepository = new MongoOrderRepository()
  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository)
  const updateOrderController = new UpdateOrderController(updateOrderUseCase)
  return updateOrderController
}
