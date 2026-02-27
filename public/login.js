const form = document.getElementById('login-form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const toggleButton = document.getElementById('toggle-password')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')
const statusMessage = document.getElementById('form-status')
const loginButton = document.getElementById('login-button')

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const setStatus = message => {
  statusMessage.textContent = message
}

const setFieldError = (input, errorNode, message) => {
  if (message) {
    errorNode.textContent = message
    input.classList.add('is-invalid')
  } else {
    errorNode.textContent = ''
    input.classList.remove('is-invalid')
  }
}

const validateEmail = () => {
  const value = emailInput.value.trim()
  if (!value) {
    setFieldError(emailInput, emailError, 'Email is required.')
    return false
  }
  if (!EMAIL_PATTERN.test(value)) {
    setFieldError(emailInput, emailError, 'Enter a valid email address.')
    return false
  }
  setFieldError(emailInput, emailError, '')
  return true
}

const validatePassword = () => {
  const value = passwordInput.value.trim()
  if (!value) {
    setFieldError(passwordInput, passwordError, 'Password is required.')
    return false
  }
  if (value.length < 8) {
    setFieldError(passwordInput, passwordError, 'Password must be at least 8 characters.')
    return false
  }
  setFieldError(passwordInput, passwordError, '')
  return true
}

const togglePasswordVisibility = () => {
  const isVisible = passwordInput.type === 'text'
  passwordInput.type = isVisible ? 'password' : 'text'
  toggleButton.textContent = isVisible ? 'Show' : 'Hide'
  toggleButton.setAttribute('aria-pressed', String(!isVisible))
  toggleButton.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password')
}

if (toggleButton) {
  toggleButton.addEventListener('click', togglePasswordVisibility)
}

if (emailInput) {
  emailInput.addEventListener('blur', validateEmail)
}

if (passwordInput) {
  passwordInput.addEventListener('blur', validatePassword)
}

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault()
    setStatus('')

    const emailValid = validateEmail()
    const passwordValid = validatePassword()

    if (!emailValid) {
      emailInput.focus()
      return
    }

    if (!passwordValid) {
      passwordInput.focus()
      return
    }

    loginButton.disabled = true
    setStatus('Form validated. Ready to submit.')
    window.setTimeout(() => {
      loginButton.disabled = false
    }, 600)
  })
}
