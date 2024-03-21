import connectDB from '../DB/connection.js'
import guardianRouter from './modules/guardian/guardian.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'

const bootstrap = (app , express) => {
    
    app.use(express.json())
    app.use("/guardian", guardianRouter)
    app.all("*" , (req ,res ,next) => {
        return next(new Error('Page not found !', {cause: 404}))
    })

    app.use(globalErrorHandling)
    connectDB()
}

export default bootstrap