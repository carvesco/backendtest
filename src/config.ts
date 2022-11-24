import dotenv from "dotenv"
dotenv.config()



export default{
    MONGO_PASSWORD: process.env.MONGODB_PSSWRD || 'h1MGrssIaZ2yMApj',
    PORT:process.env.PORT || 3000
}