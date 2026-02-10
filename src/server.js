import express from "express"
import { bookingRouter } from "./booking/booking.routes.js"

const app = express()
app.use(express.json())

app.use(bookingRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Booking API listening on port ${port}`)
})
