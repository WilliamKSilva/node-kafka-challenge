import { IUpdateOrderUseCase } from '../../../domain/usecases/order/update-order'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class UpdateOrderController implements IController {
  private readonly updateOrderUseCase: IUpdateOrderUseCase

  constructor (updateOrderUseCase: IUpdateOrderUseCase) {
    this.updateOrderUseCase = updateOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params

    const order = await this.updateOrderUseCase.update(httpRequest.body, id)

    return null
  }
}
