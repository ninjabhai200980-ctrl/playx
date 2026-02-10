import { z } from "zod"
import { TIME_SLOTS } from "../config/timeSlots.js"

export const bookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date: z.string().refine(value => {
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return !isNaN(date.getTime()) && date >= today
  }, { message: "Date must be today or in the future" }),
  timeSlot: z.string().refine(slot => TIME_SLOTS.includes(slot), {
    message: "Invalid time slot"
  })
})
