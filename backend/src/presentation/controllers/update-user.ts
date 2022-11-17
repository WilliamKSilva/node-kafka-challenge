import { IUpdateUserUseCase } from '../../domain/usecases/user/update-user'
import { InternalServerError } from '../errors/internal-server-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { HttpRequest, HttpResponse, IController } from '../protocols/http'

export class UpdateUserController implements IController {
  private readonly updateUserUseCase: IUpdateUserUseCase

  constructor (updateUserUseCase: IUpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.updateUserUseCase.update(httpRequest.body, httpRequest.params)

      return null
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return {
          code: 401,
          body: new UserNotFoundError()
        }
      }

      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
