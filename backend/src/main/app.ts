import express from 'express'
import { contentType } from './middlewares/content-type'
import { cors } from './middlewares/cors'
import { bodyParser } from './middlewares/body-parser'
import { makeRoutes } from './routes'

const app = express()

app.use(bodyParser)
app.use(cors)
app.use(contentType)
makeRoutes(app)

export default app
