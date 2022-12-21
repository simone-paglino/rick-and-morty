import React from 'react'

export interface TitleAndTextProps {
  boldText: string;
  standardText?: string | number;
  className?: string;
}

const TitleAndText: React.FC<TitleAndTextProps> = ({
  boldText,
  standardText = '',
  className = ''
}) => {
  return (
    <p className={className}>
      <b>{boldText}</b>
      {standardText && <span>{` ${standardText}`}</span>}
    </p>
  )
}

export default TitleAndText