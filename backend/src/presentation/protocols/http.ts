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
