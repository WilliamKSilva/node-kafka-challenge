import { IAddOrderUseCase } from '../../../domain/usecases/order/add-order'
import { InternalServerError } from '../../errors/internal-server-error'
import { MissingFieldError } from '../../errors/missing-field-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class CreateOrderController implements IController {
  private readonly addOrderUseCase: IAddOrderUseCase

  constructor (addOrderUseCase: IAddOrderUseCase) {
    this.addOrderUseCase = addOrderUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      return {
        code: 200,
        body: user
      }
    } catch (error) {
      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
