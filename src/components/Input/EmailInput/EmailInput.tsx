import Input from '../Input'
import { CustomInputProps } from '../Input.types'

const EmailInput = ({ input, meta, ...rest }: CustomInputProps) => (
  <Input label='Email' placeholder='mail@example.com' error={meta.touched && meta.error} {...input} {...rest} />
)

export default EmailInput
