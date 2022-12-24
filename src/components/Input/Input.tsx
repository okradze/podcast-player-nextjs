import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputProps = {
  label: React.ReactNode
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, name, error, ...inputProps }: InputProps) => (
  <p className={styles.field}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <input className={styles.input} id={name} name={name} type='text' {...inputProps} />
    {error && (
      <label role='alert' className={styles.error}>
        {error}
      </label>
    )}
  </p>
)

export default Input
