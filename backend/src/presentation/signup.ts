import { HttpRequest, HttpResponse, IController } from './protocols/http'

export class SignUpController implements IController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      code: 200,
      body: {}
    }
  }
}
