import { IOrderRepository } from '../../application/repositories/order-repository'
import { OrderModel, Status } from '../../domain/models/order'
import { IAddOrderData } from '../../domain/usecases/order/add-order'
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
}
