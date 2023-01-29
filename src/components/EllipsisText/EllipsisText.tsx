import React from 'react'
import styles from './EllipsisText.module.scss'

type EllipsisTextProps = {
  tagName?: string
  children: React.ReactNode
  className?: string
}

export const EllipsisText = ({ tagName = 'span', children, className = '' }: EllipsisTextProps) => {
  return React.createElement(tagName, { className: `${styles.Ellipsis} ${className}` }, children)
}

export default EllipsisText
