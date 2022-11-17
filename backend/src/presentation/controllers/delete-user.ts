import { IDeleteUserUseCase } from '../../domain/usecases/user/delete-user'
import { InternalServerError } from '../errors/internal-server-error'
import { HttpRequest, HttpResponse, IController } from '../protocols/http'

export class DeleteUserController implements IController {
  private readonly deleteUserUseCase: IDeleteUserUseCase

  constructor (deleteUserUseCase: IDeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      await this.deleteUserUseCase.delete(id)

      return {
        code: 204,
        body: null
      }
    } catch (error) {
      return {
        code: 500,
        body: new InternalServerError()
      }
    }
  }
}
