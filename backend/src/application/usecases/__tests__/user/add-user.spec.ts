import { IAddUserUseCase } from '../../../../domain/usecases/user/add-user'
import { AddUserUseCase } from '../../user/add-user'

interface IMakeSut {
  sut: IAddUserUseCase
}

const makeSut = (): IMakeSut => {
  const sut = new AddUserUseCase()

  return {
    sut
  }
}
