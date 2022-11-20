import { ObjectId } from 'mongodb'
import { IOrderRepository } from '../../application/repositories/order-repository'
import { OrderModel, Status } from '../../domain/models/order'
import { IAddOrderData } from '../../domain/usecases/order/add-order'
import { IUpdateOrderData } from '../../domain/usecases/order/update-order'
import { MongoHelper } from '../helpers/mongo-helper'

export class MongoOrderRepository implements IOrderRepository {
  async add (data: IAddOrderData): Promise<OrderModel> {
    const orderData: OrderModel = {
      id: '',
      name: 'test',
      description: 'test',
      status: Status.pending
    }

    const ordersCollection = await MongoHelper.getCollection('orders')
    const inserted = await ordersCollection.insertOne(orderData)

    const order = Object.assign({}, orderData, { id: inserted.insertedId.toJSON() })

    return order
  }

  async find (orderId: string): Promise<OrderModel> {
    const ordersCollection = await MongoHelper.getCollection('orders')

    const _id = new ObjectId(orderId)

    const mongoUser = await ordersCollection.findOne({ _id })

    const order: OrderModel = {
      id: mongoUser._id.toJSON(),
      name: mongoUser.name,
      description: mongoUser.description,
      status: mongoUser.status
    }

    return order
  }

  async update (data: IUpdateOrderData, orderId: string): Promise<OrderModel> {
    const ordersCollection = await MongoHelper.getCollection('orders')

    const _id = new ObjectId(orderId)

    await ordersCollection.updateOne({ _id }, {
      $set: {
        ...data
      }
    })

    const mongoUser = await ordersCollection.findOne({ _id })

    const order: OrderModel = {
      id: mongoUser._id.toJSON(),
      name: mongoUser.name,
      description: mongoUser.description,
      status: mongoUser.status
    }

    return order
  }
}
