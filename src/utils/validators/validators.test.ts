import {
  validateFullName,
  validateEmail,
  validatePassword,
  validatePasswordRequired,
  composeValidators,
} from './validators'

describe('Validators', () => {
  it('composes validators', () => {
    const validateRequired = (value?: string) => {
      if (!value) return 'Value is required'
    }
    const validate = composeValidators(validateRequired, validateEmail)

    expect(validate('')).toBe('Value is required')
    expect(validate('test')).toBe('Email is not valid')
  })

  it('validates full name', () => {
    const errorMessage = 'Full name is required'
    expect(validateFullName()).toBe(errorMessage)
    expect(validateFullName('')).toBe(errorMessage)
    expect(validateFullName('M')).toBe(errorMessage)
    expect(validateFullName('Mi')).toBe(undefined)
  })

  it('validates email', () => {
    const errorMessage = 'Email is not valid'
    expect(validateEmail()).toBe(errorMessage)
    expect(validateEmail('')).toBe(errorMessage)
    expect(validateEmail('test@')).toBe(errorMessage)
    expect(validateEmail('test@gmail')).toBe(errorMessage)
    expect(validateEmail('test@gmail.com')).toBe(undefined)
  })

  it('validates password', () => {
    const errorMessage = 'Password must be min 8 characters'
    expect(validatePassword()).toBe(errorMessage)
    expect(validatePassword('')).toBe(errorMessage)
    expect(validatePassword('pass')).toBe(errorMessage)
    expect(validatePassword('password')).toBe(undefined)
  })

  it('validates required password', () => {
    const errorMessage = 'Password is required'
    expect(validatePasswordRequired()).toBe(errorMessage)
    expect(validatePasswordRequired('')).toBe(errorMessage)
    expect(validatePasswordRequired('p')).toBe(undefined)
  })
})
