import { MongoHelper } from '../infra/helpers/mongo-helper'
import env from './env'
import app from './app'

MongoHelper.connect(env.mongoURL).then(() => {
  app.listen('3000', () => {
    console.log('Server is running!')
  })
}).catch(error => console.log(error))
