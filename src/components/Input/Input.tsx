import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputProps = {
  label: React.ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, name, ...inputProps }: InputProps) => (
  <p className={styles.field}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <input className={styles.input} id={name} type='text' {...inputProps} />
  </p>
)

export default Input
