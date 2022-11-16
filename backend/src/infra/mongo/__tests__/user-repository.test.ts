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
    const user: UserModel = {
      id: '',
      name: '',
      password: '',
      email: ''
    }

    const _id = new ObjectId(createdUserId)

    const mongoUser = await usersCollection.findOne({
      _id
    })

    Object.assign(user, mongoUser, { id: mongoUser._id })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })

  it('Should find a user on findByEmail method', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    const user: UserModel = {
      id: '',
      name: '',
      password: '',
      email: ''
    }

    const email = 'test@test.com'

    const mongoUser = await usersCollection.findOne({ email })

    Object.assign(user, mongoUser, { id: mongoUser._id })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })
})
