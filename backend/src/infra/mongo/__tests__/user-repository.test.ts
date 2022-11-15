import { UserModel } from '../../../domain/models/user'
import { MongoHelper } from '../../helpers/mongo-helper'

describe('UserRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://docker-test:admin@localhost:27020')
  })

  beforeEach(async () => {
    const usersCollection = await MongoHelper.getCollection('accounts')
    await usersCollection.deleteMany({})
  })

  afterAll(async () => {
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

    const user = Object.assign({}, userData, { id: inserted.insertedId })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('test')
    expect(user.email).toBe('test@test.com')
    expect(user.password).toBe('test_hash')
  })
})
