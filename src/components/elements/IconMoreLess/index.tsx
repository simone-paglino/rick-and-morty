import React from 'react'
// Icons
import {ReactComponent as IconPlus} from '../../../assets/svg/icons/plus.svg'
import {ReactComponent as IconMinus} from '../../../assets/svg/icons/minus.svg'

export interface IconMoreLessProps {
  show?: boolean;
  onClick?: () => void;
  className?: string;
}

const IconMoreLess: React.FC<IconMoreLessProps> = ({ show = false, onClick, className = '' }) => {
	const handleOnClick = (): void => {
		if (onClick) {
			onClick()
		}
	}

	const IconToRender = show ? IconMinus : IconPlus

	return <IconToRender className={className} onClick={handleOnClick} />
}

export default IconMoreLess