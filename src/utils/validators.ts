export const validateFullName = (fullName: string) => {
  if (fullName.length < 2) return 'Full Name is required'
}

export const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if (!regex.test(email)) return 'Email is not valid'
}
