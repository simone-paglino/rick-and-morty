import React from 'react'
// Types
import { IconMoreLessProps } from '../../../types/elements'
// Icons
import {ReactComponent as IconPlus} from '../../../assets/svg/icons/plus.svg'
import {ReactComponent as IconMinus} from '../../../assets/svg/icons/minus.svg'

const IconMoreLess: React.FC<IconMoreLessProps> = ({ show = false, onClick, className = '' }) => {
  const handleOnClick = (): void => {
    onClick()
  }

  const IconToRender = show ? IconMinus : IconPlus

  return <IconToRender data-testid={show ? 'minus-icon' : 'plus-icon'} className={className} onClick={handleOnClick} />
}

export default IconMoreLess