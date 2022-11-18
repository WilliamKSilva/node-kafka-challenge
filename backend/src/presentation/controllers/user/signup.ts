import { IAddUserUseCase } from '../../../domain/usecases/user/add-user'
import { InternalServerError } from '../../errors/internal-server-error'
import { MissingFieldError } from '../../errors/missing-field-error'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { HttpRequest, HttpResponse, IController } from '../../protocols/http'

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

      const createdUser = await this.addUserUseCase.add(httpRequest.body)

      if (!createdUser) {
        return {
          code: 400,
          body: new UserAlreadyExistsError()
        }
      }

      return {
        code: 200,
        body: createdUser
      }
    } catch (error) {
      console.log(error)

      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
