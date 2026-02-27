const form = document.getElementById('booking-form')
const timeSelect = form.elements.timeSlot
const submitBtn = document.getElementById('submit-btn')
const statusEl = document.getElementById('status')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldConfigs = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('name-error'),
    validate: value => (value.trim() ? '' : 'Name is required')
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('email-error'),
    validate: value => {
      if (!value.trim()) return 'Email is required'
      return emailPattern.test(value) ? '' : 'Enter a valid email address'
    }
  },
  password: {
    input: document.getElementById('password'),
    error: document.getElementById('password-error'),
    validate: value => {
      if (!value) return 'Password is required'
      return value.length >= 8 ? '' : 'Password must be at least 8 characters'
    }
  },
  date: {
    input: document.getElementById('date'),
    error: document.getElementById('date-error'),
    validate: value => (value ? '' : 'Date is required')
  },
  timeSlot: {
    input: document.getElementById('timeSlot'),
    error: document.getElementById('timeSlot-error'),
    validate: value => (value ? '' : 'Time is required')
  }
}

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00'
]

TIME_SLOTS.forEach(slot => {
  const option = document.createElement('option')
  option.value = slot
  option.textContent = slot
  timeSelect.appendChild(option)
})

const setFieldError = (key, message) => {
  const field = fieldConfigs[key]
  field.error.textContent = message
  field.input.setAttribute('aria-invalid', message ? 'true' : 'false')
}

const validateField = key => {
  const field = fieldConfigs[key]
  const message = field.validate(field.input.value)
  setFieldError(key, message)
  return !message
}

const validateAll = () =>
  Object.keys(fieldConfigs).every(key => validateField(key))

const updateSubmitState = () => {
  const isValid = Object.keys(fieldConfigs).every(key => !fieldConfigs[key].validate(fieldConfigs[key].input.value))
  submitBtn.disabled = !isValid
}

Object.keys(fieldConfigs).forEach(key => {
  const { input } = fieldConfigs[key]
  input.addEventListener('blur', () => {
    validateField(key)
    updateSubmitState()
  })
  input.addEventListener('input', () => {
    if (fieldConfigs[key].error.textContent) {
      validateField(key)
    }
    updateSubmitState()
  })
})

updateSubmitState()

form.addEventListener('submit', async event => {
  event.preventDefault()

  statusEl.textContent = ''

  if (!validateAll()) {
    updateSubmitState()
    return
  }

  submitBtn.disabled = true
  submitBtn.textContent = 'Booking...'

  const payload = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    date: form.elements.date.value,
    timeSlot: form.elements.timeSlot.value
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
    Object.keys(fieldConfigs).forEach(key => setFieldError(key, ''))
    updateSubmitState()
  } catch (err) {
    statusEl.textContent = err.message
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Book now'
  }
})
