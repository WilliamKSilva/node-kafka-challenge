import { Encrypter } from '../../application/protocols/encrypter'
import bcrypt from 'bcrypt'
import { InternalServerError } from '../../presentation/errors/interal-server-error'

export class BcryptAdapter implements Encrypter {
  async encrypt (password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10)

    return await new Promise(resolve => resolve('test'))
  }
}
