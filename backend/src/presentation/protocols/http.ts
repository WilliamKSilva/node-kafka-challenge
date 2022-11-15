
export interface HttpResponse {
  code: number
  body: any
}

export interface HttpRequest {
  body?: any
  params?: any
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
