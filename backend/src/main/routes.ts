/* eslint-disable */
import { Express, Router } from 'express'
import { makeGetUserController } from './factories/get-user-factory'
import { makeSignUpHandler } from './factories/signup-factory'
import { makeUpdateUserController } from './factories/update-user-factory'
import { adaptRoute } from './helpers/express-adapter'

export const makeRoutes = (app: Express): void => {
  const router = Router()
  app.use("/api", router)

  router.post('/users', adaptRoute(makeSignUpHandler()))
  router.get('/users/:id', adaptRoute(makeGetUserController()))
  router.patch('/users/:id', adaptRoute(makeUpdateUserController()))
}
