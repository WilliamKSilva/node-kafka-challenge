import { IUserRepository } from '../../application/repositories/user-repository'
import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoUserRepository implements IUserRepository {
  async add (data: IAddUserData): Promise<UserModel> {
    const usersCollection = (await MongoHelper.getCollection('users'))
    const user: UserModel = {
      id: '',
      name: data.name,
      email: data.email,
      password: data.password
    }

    const inserted = await usersCollection.insertOne(user)

    user.id = inserted.insertedId.toJSON()

    return user
  }
}
