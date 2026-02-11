import { z } from "zod"
import { TIME_SLOTS } from "../config/timeSlots.js"

export const bookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  date: z.string().refine(value => {
    const [year, month, day] = value.split("-").map(Number)
    const selectedDate = new Date(year, month - 1, day)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return selectedDate >= today
  }, { message: "Invalid date selected" }),
  timeSlot: z.string().refine(slot => TIME_SLOTS.includes(slot), {
    message: "Invalid time slot"
  })
})
