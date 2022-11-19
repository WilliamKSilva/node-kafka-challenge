import { ObjectId } from 'mongodb'
import { OrderModel, Status } from '../../../domain/models/order'
import { MongoHelper } from '../../helpers/mongo-helper'

let createdOrderId

describe('UserRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://docker-test:admin@localhost:27020')
  })

  afterAll(async () => {
    const usersCollection = await MongoHelper.getCollection('accounts')
    await usersCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  it('Should create an order', async () => {
    const orderData: OrderModel = {
      id: '',
      name: 'test',
      description: 'test',
      status: Status.pending
    }

    const ordersCollection = await MongoHelper.getCollection('orders')
    const inserted = await ordersCollection.insertOne(orderData)

    createdOrderId = inserted.insertedId.toJSON()

    const order = Object.assign({}, orderData, { id: inserted.insertedId.toJSON() })

    expect(order.id).toBeTruthy()
    expect(order.name).toBe('test')
    expect(order.description).toBe('test')
    expect(order.status).toBe(Status.pending)
  })

  it('Should find an order', async () => {
    const ordersCollection = await MongoHelper.getCollection('orders')

    const _id = new ObjectId(createdOrderId)

    const mongoUser = await ordersCollection.findOne({ _id })

    const order: OrderModel = {
      id: mongoUser._id.toJSON(),
      name: mongoUser.name,
      description: mongoUser.description,
      status: mongoUser.status
    }

    expect(order.id).toBeTruthy()
    expect(order.name).toBe('test')
    expect(order.description).toBe('test')
    expect(order.status).toBe(Status.pending)
  })
})
