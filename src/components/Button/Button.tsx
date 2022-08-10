import React from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode
  inverted?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, inverted, ...otherProps }: ButtonProps) => (
  <button
    type='button'
    className={`${styles.Button} ${inverted ? styles.Inverted : ''}`}
    {...otherProps}
  >
    {children}
  </button>
)

export default Button
