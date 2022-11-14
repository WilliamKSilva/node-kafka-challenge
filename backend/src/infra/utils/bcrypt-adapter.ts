import { IEncrypter } from '../../application/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter {
  async encrypt (password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10)

    return hashed
  }
}
