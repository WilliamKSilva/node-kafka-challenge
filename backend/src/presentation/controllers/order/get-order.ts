import { IGetOrderUseCase } from '../../../domain/usecases/order/get-order'
import { InternalServerError } from '../../errors/internal-server-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class GetOrderController implements IController {
  private readonly getOrderUseCase: IGetOrderUseCase

  constructor (getOrderUseCase: IGetOrderUseCase) {
    this.getOrderUseCase = getOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const order = await this.getOrderUseCase.find(id)

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
