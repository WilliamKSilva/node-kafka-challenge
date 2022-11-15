/* eslint-disable */
import { Express, Router } from 'express'
import { makeSignUpHandler } from './factories/signup-factory'
import { adaptRoute } from './helpers/express-adapter'

export const makeRoutes = (app: Express): void => {
  const router = Router()
  app.use("/api", router)

  router.post('/users', adaptRoute(makeSignUpHandler()))
}
