import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import DBConnection from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import projectRoutes from './src/routes/projectRoutes.js'
import cookieParser from 'cookie-parser'

// Middleware configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// .env & database configuration
dotenv.config()
DBConnection()

// Define Routes
app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})