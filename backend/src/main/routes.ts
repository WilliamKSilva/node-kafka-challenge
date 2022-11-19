/* eslint-disable */
import { Express, Router } from 'express'
import { makeCreateOrderController } from './factories/order/create-order-controller'
import { makeGetOrderController } from './factories/order/get-order-controller'
import { makeDeleteUserController } from './factories/user/delete-user-factory'
import { makeGetUserController } from './factories/user/get-user-factory'
import { makeSignUpHandler } from './factories/user/signup-factory'
import { makeUpdateUserController } from './factories/user/update-user-factory'
import { adaptRoute } from './helpers/express-adapter'

export const makeRoutes = (app: Express): void => {
  const router = Router()
  app.use("/api", router)

  router.post('/users', adaptRoute(makeSignUpHandler()))
  router.get('/users/:id', adaptRoute(makeGetUserController()))
  router.patch('/users/:id', adaptRoute(makeUpdateUserController()))
  router.delete('/users/:id', adaptRoute(makeDeleteUserController()))

  router.post("/orders", adaptRoute(makeCreateOrderController()))
  router.get("/orders/:id", adaptRoute(makeGetOrderController()))
}
