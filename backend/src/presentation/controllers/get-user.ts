import { IGetUserUseCase } from '../../domain/usecases/user/get-user'
import { InternalServerError } from '../errors/internal-server-error'
import { HttpRequest, HttpResponse, IController } from '../protocols/http'

export class GetUserController implements IController {
  private readonly getUserUseCase: IGetUserUseCase

  constructor (getUserUseCase: IGetUserUseCase) {
    this.getUserUseCase = getUserUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const user = await this.getUserUseCase.find(id)

      return null
    } catch (error) {
      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
