import { FieldValidator } from 'final-form'
import { ReactElement } from 'react'

export const composeValidators =
  <FieldValue>(...validators: FieldValidator<FieldValue>[]): FieldValidator<FieldValue> =>
  (...args): ReactElement | undefined =>
    validators.reduce(
      (error: ReactElement | undefined, validator: FieldValidator<FieldValue>) => error || validator(...args),
      undefined,
    )

export const validateFullName = (fullName?: string) => {
  if (!fullName || fullName.length < 2) return 'Full name is required'
}

export const validateEmail = (email?: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if (!email || !regex.test(email)) return 'Email is not valid'
}

export const validatePassword = (password?: string) => {
  if (!password || password.length < 8) return 'Password must be min 8 characters'
}

export const validatePasswordRequired = (password?: string) => {
  if (!password) return 'Password is required'
}
