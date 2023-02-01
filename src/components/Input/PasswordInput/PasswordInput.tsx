import Input from '../Input'
import { CustomInputProps } from '../Input.types'

const PasswordInput = ({ input, meta, ...rest }: CustomInputProps) => (
  <Input label='Password' type='password' error={meta.touched && meta.error} {...input} {...rest} />
)

export default PasswordInput
