import { IUpdateUserUseCase } from '../../domain/usecases/user/update-user'
import { HttpRequest, HttpResponse, IController } from '../protocols/http'

export class UpdateUserController implements IController {
  private readonly updateUserUseCase: IUpdateUserUseCase

  constructor (updateUserUseCase: IUpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.updateUserUseCase.update(httpRequest.body, httpRequest.params)

    return null
  }
}
