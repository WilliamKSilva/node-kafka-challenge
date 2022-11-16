import { Request, Response } from 'express'
import { HttpRequest, IController } from '../../presentation/protocols/http'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.code).send(httpResponse.body)
  }
}
