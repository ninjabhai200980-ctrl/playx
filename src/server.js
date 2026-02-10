import express from 'express'
import dotenv from 'dotenv'
import { initDb } from './services/db.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static('public'))

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

const port = process.env.PORT || 3000

async function start() {
  await initDb()
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
  })
}

start().catch(err => {
  console.error('Failed to start server', err)
  process.exit(1)
})
