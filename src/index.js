import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'
import router from './routes/index.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)

app.listen(process.env.PORT, () => 
    console.log(
        chalk.white.bgBlue(`Server listening on port ${process.env.PORT}...`)
    )
)