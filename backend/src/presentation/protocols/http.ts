import { InternalServerError } from '../errors/interal-server-error'

export interface HttpResponse {
  code: number
  body: any
}

export interface HttpRequest {
  body: any
}

export interface IController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export const badRequest = (error: any): HttpResponse => {
  return {
    code: 400,
    body: error
  }
}

export const internalError = (): HttpResponse => {
  return {
    code: 500,
    body: new InternalServerError()
  }
}
