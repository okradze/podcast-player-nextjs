import React from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
  children: React.ReactNode
  element?: 'button' | 'link'
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = ({
  variant = 'contained',
  color = 'primary',
  element = 'button',
  children,
  className,
  ...otherProps
}: ButtonProps) => {
  const classNames = `${styles.button} ${styles[variant]} ${styles[color]} ${className || ''}`

  return element === 'link' ? (
    <a className={classNames} {...otherProps}>
      {children}
    </a>
  ) : (
    <button type='button' className={classNames} {...otherProps}>
      {children}
    </button>
  )
}

export default Button
