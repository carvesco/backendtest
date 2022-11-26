import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes"
import verifytoken from "./middleware/validate-jwt"


const app = express()

app.set('port',config.PORT)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(userRoutes)
app.use(verifytoken,productRoutes)

export default app 