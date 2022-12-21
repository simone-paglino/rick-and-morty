import React from 'react'
// Elements
import Button from '../../elements/Button'
// Styles
import './index.scss'

export interface PaginationBarProps {
  pageNumber: number;
  onClickNext: () => void;
  onClickPrevious: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  pageNumber,
  onClickNext,
  onClickPrevious,
  disableNext,
  disablePrevious
}) => {
  return (
    <div className='pagination-bar'>
      <Button onClick={onClickPrevious} disabled={disablePrevious}>Previous</Button>
      <h4 className='pagination-bar__page-number'>{pageNumber}</h4>
      <Button onClick={onClickNext} disabled={disableNext}>Next</Button>
    </div>
  )
}

export default PaginationBar