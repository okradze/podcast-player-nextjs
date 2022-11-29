import React from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  variant = 'contained',
  color = 'primary',
  children,
  ...otherProps
}: ButtonProps) => (
  <button
    type='button'
    className={`${styles.button} ${styles[variant]} ${styles[color]}`}
    {...otherProps}
  >
    {children}
  </button>
)

export default Button
