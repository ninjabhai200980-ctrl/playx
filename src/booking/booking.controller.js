import { bookingSchema } from "./booking.schema.js"
import { isDuplicateBooking, saveBooking } from "./booking.store.js"

export function createBooking(req, res) {
  const result = bookingSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: result.error.flatten().fieldErrors
    })
  }

  const booking = result.data

  if (isDuplicateBooking(booking)) {
    return res.status(409).json({
      error: "Duplicate booking"
    })
  }

  saveBooking(booking)

  return res.status(201).json({
    message: "Booking interest captured"
  })
}
