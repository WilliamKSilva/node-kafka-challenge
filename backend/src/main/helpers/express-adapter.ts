import { Request, Response } from 'express'
import { IController } from '../../presentation/protocols/http'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.code).send(httpResponse.body)
  }
}
