import express from 'express'
const app = express()
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})