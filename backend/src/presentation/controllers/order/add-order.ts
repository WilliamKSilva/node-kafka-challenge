import { IAddOrderUseCase } from '../../../domain/usecases/order/add-order'
import { MissingFieldError } from '../../errors/missing-field-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class CreateOrderController implements IController {
  private readonly addOrderUseCase: IAddOrderUseCase

  constructor (addOrderUseCase: IAddOrderUseCase) {
    this.addOrderUseCase = addOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        code: 400,
        body: new MissingFieldError('name')
      }
    }

    if (!httpRequest.body.description) {
      return {
        code: 400,
        body: new MissingFieldError('description')
      }
    }

    const user = await this.addOrderUseCase.add(httpRequest.body)

    return null
  }
}
