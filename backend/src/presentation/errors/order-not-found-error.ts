
export class OrderNotFoundError extends Error {
  constructor () {
    super('This order does not exists')
    this.name = 'OrderNotFoundError'
  }
}
