import React from 'react'
// Types
import { EventOnClickButton } from '../../../types/general'
// Styles
import './index.scss'

export interface ButtonProps {
  onClick: (event?: EventOnClickButton) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({onClick, className = '', disabled = false, children}) => {
	return (
		<button className={`button ${className}`} type="button" onClick={onClick} disabled={disabled}>{children}</button>
	)
}

export default Button