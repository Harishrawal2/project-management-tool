import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import DBConnection from './src/config/db.js'

// Middleware configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// .env & database configuration
dotenv.config()
DBConnection()

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})