import Input from '../Input'
import { CustomInputProps } from '../Input.types'

const FullNameInput = ({ input, meta, ...rest }: CustomInputProps) => (
  <Input label='Full Name' placeholder='John Doe' error={meta.touched && meta.error} {...input} {...rest} />
)

export default FullNameInput
