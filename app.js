const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/error')

dotenv.config({ path: './config.env' });

mongoose.connect("mongodb://127.0.0.1/CRUD", {

}).then(() => console.log("DB running"))




const app = express()
app.use(express.json())
app.use('/api/users', userRouter)

app.use(globalErrorHandler)

app.listen(6000, () => {
    console.log("Server is running")
})