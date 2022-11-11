import { HttpRequest, HttpResponse, IController } from '../protocols/http'
import { MissingFieldError } from '../utils/missing-field-error'

export class SignUpController implements IController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return {
        code: 400,
        body: new MissingFieldError('email')
      }
    }

    if (!httpRequest.body.name) {
      return {
        code: 400,
        body: new MissingFieldError('name')
      }
    }

    if (!httpRequest.body.password) {
      return {
        code: 400,
        body: new MissingFieldError('password')
      }
    }

    return {
      code: 200,
      body: {}
    }
  }
}
