import express, { Application, NextFunction, Request, Response } from 'express'
import { UsersRoutes } from './routes/user.routes'
import { SchedulesRoutes } from './routes/schedules.routes'
import cors from 'cors'


const app:Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const usersRoutes = new UsersRoutes().getRoutes()
const schedulesRoutes = new SchedulesRoutes().getRoutes()
app.use(cors())
app.use('/users', usersRoutes)
app.use('/schedules', schedulesRoutes)
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    if ( err instanceof Error){
        return res.status(400).json({
            message: err.message
        })
    }
    return res.status(500).json({
        message: "internal server error"
    })
})

app.listen(3000, () => console.log('server is running 🚀'))
