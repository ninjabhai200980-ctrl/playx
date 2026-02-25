const bookings = []

export function isDuplicateBooking({ email, date, timeSlot }) {
  return bookings.some(b =>
    b.email === email && b.date === date && b.timeSlot === timeSlot
  )
}

export function saveBooking(booking) {
  bookings.push(booking)
}
