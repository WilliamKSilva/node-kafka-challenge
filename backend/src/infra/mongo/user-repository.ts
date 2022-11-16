import { ObjectId } from 'mongodb'
import { IUserRepository } from '../../application/repositories/user-repository'
import { UserModel } from '../../domain/models/user'
import { IAddUserData } from '../../domain/usecases/user/add-user'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoUserRepository implements IUserRepository {
  async add (data: IAddUserData): Promise<UserModel> {
    const usersCollection = (await MongoHelper.getCollection('users'))
    const userData: UserModel = {
      id: '',
      name: data.name,
      email: data.email,
      password: data.password
    }

    const inserted = await usersCollection.insertOne(data)

    const user = Object.assign({}, userData, { id: inserted.insertedId.toJSON() })

    return user
  }

  async findByEmail (email: string): Promise<UserModel> {
    const usersCollection = await MongoHelper.getCollection('users')
    const user: UserModel = {
      id: '',
      name: '',
      password: '',
      email: ''
    }

    const mongoUser = await usersCollection.findOne({ email })

    if (!mongoUser) {
      return null
    }

    Object.assign(user, mongoUser, { id: mongoUser._id.toJSON() })

    return user
  }

  async findById (id: string): Promise<UserModel> {
    const usersCollection = await MongoHelper.getCollection('users')

    const _id = new ObjectId(id)

    const mongoUser = await usersCollection.findOne({ _id })
    const { _id: objectId, ...userObject } = mongoUser

    if (!mongoUser) {
      return null
    }

    const user = Object.assign(userObject, userObject as UserModel, { id: mongoUser._id.toJSON() })

    return user
  }
}
