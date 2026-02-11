const form = document.getElementById('booking-form')
const timeSelect = form.elements.time
const submitBtn = document.getElementById('submit-btn')
const statusEl = document.getElementById('status')

const TIME_SLOTS = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00"
]

TIME_SLOTS.forEach(slot => {
  const option = document.createElement('option')
  option.value = slot
  option.textContent = slot
  timeSelect.appendChild(option)
})

form.addEventListener('submit', async event => {
  event.preventDefault()

  submitBtn.disabled = true
  submitBtn.textContent = 'Booking...'
  statusEl.textContent = ''

  const payload = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    date: form.elements.date.value,
    timeSlot: form.elements.time.value
  }

  try {
    const res = await fetch('/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Booking failed')
    }

    statusEl.textContent = 'Booking confirmed'
    form.reset()
  } catch (err) {
    statusEl.textContent = err.message
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Book now'
  }
})
