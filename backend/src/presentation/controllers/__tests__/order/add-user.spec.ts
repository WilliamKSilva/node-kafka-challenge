import { MissingFieldError } from '../../../errors/missing-field-error'
import { IController } from '../../../protocols/http'
import { CreateOrderController } from '../../order/add-order'

interface IMakeSut {
  sut: IController
}

const makeSut = (): IMakeSut => {
  const sut = new CreateOrderController()

  return {
    sut
  }
}

describe('CreateUserController', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'test'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.code).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('name'))
  })
})
