import { MissingFieldError } from '../../errors/missing-field-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

export class CreateOrderController implements IController {
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

    return null
  }
}
