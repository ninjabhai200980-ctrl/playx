import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { initDb } from './services/db.js'

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, '..', 'public')

app.use(express.json())
app.use(express.static(publicDir))

app.get(['/', '/login'], (_req, res) => {
  res.sendFile(path.join(publicDir, 'login.html'))
})

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
