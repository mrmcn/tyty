export default function validate(newData) {
  const errors = {}

  if (newData.firstName)
    if (typeof newData.firstName !== 'string' || newData.firstName.length < 3) {
      errors.firstName = "That doesn't look like an first name"
    }
  if (newData.lastName)
    if (typeof newData.lastName !== 'string' || newData.lastName.length < 3) {
      errors.lastName = "That doesn't look like an last name"
    }
  if (newData.phone)
    if (typeof newData.phone !== 'string' || newData.phone.length < 10) {
      errors.phone = "That doesn't look like an phone number"
    }
  if (newData.username)
    if (typeof newData.username !== 'string' || newData.username.length < 3) {
      errors.username = "That doesn't look like an username"
    }
  if (newData.password)
    if (typeof newData.password !== 'string' || newData.password.length < 6) {
      errors.password = "That doesn't look like an password"
    }
  return errors
}
