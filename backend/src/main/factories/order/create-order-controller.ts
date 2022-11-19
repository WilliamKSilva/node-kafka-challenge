import { AddOrderUseCase } from '../../../application/usecases/order/add-order'
import { MongoOrderRepository } from '../../../infra/mongo/order-repository'
import { CreateOrderController } from '../../../presentation/controllers/order/add-order'
import { IController } from '../../../presentation/protocols/http'

export const makeCreateOrderController = (): IController => {
  const orderRepository = new MongoOrderRepository()
  const addOrderUseCase = new AddOrderUseCase(orderRepository)
  const createOrderController = new CreateOrderController(addOrderUseCase)
  return createOrderController
}
