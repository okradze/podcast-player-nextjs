export const validateFullName = (fullName: string | undefined) => {
  if (!fullName || fullName.length < 2) return 'Full Name is required'
}

export const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if (!regex.test(email)) return 'Email is not valid'
}

export const validatePassword = (password: string | undefined) => {
  if (!password || password.length < 8) return 'Password must be min 8 characters'
}
