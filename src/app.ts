import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import path from 'path'
const app: Application = express()

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['*', 'http://localhost:3000'], // Allow your frontend URL
    credentials: true, // Allow credentials to be included
  }),
)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Bhojjo Running!')
})
app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app
