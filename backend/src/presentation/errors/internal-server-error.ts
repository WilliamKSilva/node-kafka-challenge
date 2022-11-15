
export class InternalServerError extends Error {
  constructor (error: string) {
    super(`Internal Server Error: ${error}`)
    this.name = 'InternalServerError'
  }
}
