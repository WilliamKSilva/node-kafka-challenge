
export class UserNotFoundError extends Error {
  constructor () {
    super('This user does not exists')
    this.name = 'UserNotFoundError'
  }
}
