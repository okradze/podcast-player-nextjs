import React, { forwardRef, LegacyRef } from 'react'
import { ForwardRefRenderFunction } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary'
  children: React.ReactNode
  element?: 'button' | 'link'
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

const Button = (
  {
    variant = 'contained',
    color = 'primary',
    element = 'button',
    children,
    className,
    ...otherProps
  }: ButtonProps,
  ref: LegacyRef<HTMLAnchorElement | HTMLButtonElement>,
) => {
  const classNames = `${styles.button} ${styles[variant]} ${styles[color]} ${className || ''}`

  return element === 'link' ? (
    <a ref={ref as LegacyRef<HTMLAnchorElement>} className={classNames} {...otherProps}>
      {children}
    </a>
  ) : (
    <button
      ref={ref as LegacyRef<HTMLButtonElement>}
      type='button'
      className={classNames}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(Button)
