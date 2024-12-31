import express from "express"
import {connectDB} from "./database/db.js"
connectDB()

const port = process.env.PORT || 3000
const app = express()
import priceRouter from "./router/priceRouter.js"
app.use("/", priceRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);  
})