import { HttpRequest, HttpResponse, IController } from '../protocols/http'

export class UpdateUserController implements IController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return null
  }
}
