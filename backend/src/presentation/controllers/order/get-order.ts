import { IGetOrderUseCase } from '../../../domain/usecases/order/get-order'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class GetOrderController implements IController {
  private readonly getOrderUseCase: IGetOrderUseCase

  constructor (getOrderUseCase: IGetOrderUseCase) {
    this.getOrderUseCase = getOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params

    const order = await this.getOrderUseCase.find(id)

    return null
  }
}
