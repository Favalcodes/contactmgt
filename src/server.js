const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/database')
const dotenv = require('dotenv').config()

connectDB()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use("/api/contacts", require('./routes'))
app.use("/api/users", require('./routes/userRoute'))
app.use(errorHandler)

app.listen(port, () => {
    console.log('server running on ' + port)
})