import { IUpdateOrderUseCase } from '../../../domain/usecases/order/update-order'
import { InternalServerError } from '../../errors/internal-server-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class UpdateOrderController implements IController {
  private readonly updateOrderUseCase: IUpdateOrderUseCase

  constructor (updateOrderUseCase: IUpdateOrderUseCase) {
    this.updateOrderUseCase = updateOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const order = await this.updateOrderUseCase.update(httpRequest.body, id)

      return {
        code: 200,
        body: order
      }
    } catch (error) {
      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
