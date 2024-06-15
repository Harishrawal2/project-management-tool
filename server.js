import express from 'express'
const app = express()
import dotenv from 'dotenv'
import DBConnection from './src/config/db.js'

dotenv.config()
DBConnection()

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})