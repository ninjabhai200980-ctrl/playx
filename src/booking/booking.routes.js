import express from "express"
import { createBooking } from "./booking.controller.js"

export const bookingRouter = express.Router()

bookingRouter.post("/booking", createBooking)
