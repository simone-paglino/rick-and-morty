import React from 'react'
// Types
import { ButtonProps } from '../../../types/elements'
// Styles
import './index.scss'

const Button: React.FC<ButtonProps> = ({onClick, className = '', disabled = false, children}) => {
	return (
		<button className={`button ${className}`} type="button" onClick={onClick} disabled={disabled}>{children}</button>
	)
}

export default Button