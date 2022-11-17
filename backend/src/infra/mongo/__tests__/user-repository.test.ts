import { ObjectId } from 'mongodb'
import { UserModel } from '../../../domain/models/user'
import { MongoHelper } from '../../helpers/mongo-helper'

let createdUserId

describe('UserRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://docker-test:admin@localhost:27020')
  })

  afterAll(async () => {
    const usersCollection = await MongoHelper.getCollection('accounts')
    await usersCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  it('Should create an user', async () => {
    const userData: UserModel = {
      id: '',
      email: 'test@test.com',
      name: 'test',
      password: 'test_hash'
    }

    const usersCollection = await MongoHelper.getCollection('users')
    const inserted = await usersCollection.insertOne(userData)

    createdUserId = inserted.insertedId.toJSON()

    const user = Object.assign({}, userData, { id: inserted.insertedId })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })

  it('Should find an user on findById method', async () => {
    const usersCollection = await MongoHelper.getCollection('users')

    const _id = new ObjectId(createdUserId)

    const mongoUser = await usersCollection.findOne({
      _id
    })

    const { _id: objectId, ...userObject } = mongoUser

    const user = Object.assign({}, userObject as UserModel, { id: mongoUser._id.toJSON() })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })

  it('Should find a user on findByEmail method', async () => {
    const usersCollection = await MongoHelper.getCollection('users')

    const email = 'test@test.com'

    const mongoUser = await usersCollection.findOne({ email })

    const { _id: objectId, ...userObject } = mongoUser

    const user = Object.assign({}, userObject as UserModel, { id: mongoUser._id.toJSON() })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })

  it('Should update a user on update method', async () => {
    const usersCollection = await MongoHelper.getCollection('users')

    const userData = {
      name: 'test',
      email: 'test@test.com',
      password: 'test'
    }

    const _id = new ObjectId(createdUserId)

    await usersCollection.updateOne({ _id }, {
      $set: {
        ...userData
      }
    })

    const mongoUser = await usersCollection.findOne({ _id })

    const user: UserModel = {
      id: mongoUser._id.toJSON(),
      name: mongoUser.name,
      email: mongoUser.email,
      password: mongoUser.password
    }

    expect(user).toMatchObject(userData)
  })
})
