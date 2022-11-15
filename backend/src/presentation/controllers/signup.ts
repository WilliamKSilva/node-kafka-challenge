import { IAddUserUseCase } from '../../domain/usecases/user/add-user'
import { HttpRequest, HttpResponse, IController } from '../protocols/http'
import { MissingFieldError } from '../errors/missing-field-error'
import { InternalServerError } from '../errors/internal-server-error'

export class SignUpController implements IController {
  private readonly addUserUseCase: IAddUserUseCase

  constructor (addUserUseCase: IAddUserUseCase) {
    this.addUserUseCase = addUserUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const user = await this.addUserUseCase.add(httpRequest.body)

      return {
        code: 200,
        body: user
      }
    } catch (error) {
      return {
        code: 500,
        body: new InternalServerError(error)
      }
    }
  }
}
