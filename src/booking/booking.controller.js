import { bookingSchema } from "./booking.schema.js"
import { getDb } from "../services/db.js"

export async function createBooking(req, res) {
  const result = bookingSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request",
      details: result.error.flatten().fieldErrors
    })
  }

  const booking = result.data
  const db = getDb()

  try {
    const duplicateCheck = await db.query(
      `SELECT 1 FROM bookings WHERE date = $1 AND time_slot = $2`,
      [booking.date, booking.timeSlot]
    )

    if (duplicateCheck.rowCount > 0) {
      return res.status(409).json({ error: "Duplicate booking" })
    }

    await db.query(
      `INSERT INTO bookings (name, email, date, time_slot)
       VALUES ($1, $2, $3, $4)`,
      [booking.name, booking.email, booking.date, booking.timeSlot]
    )

    return res.status(201).json({
      message: "Booking created successfully"
    })
  } catch (err) {
    return res.status(500).json({ error: "Database error" })
  }
}
