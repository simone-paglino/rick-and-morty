import React from 'react'
import Button from '../../elements/Button'
import FlexBox from '../../design-system/FlexBox'
import Text from '../../design-system/Text'
import Spacer from '../../design-system/Spacer'
import { PaginationStyled } from './styled'

export interface PaginationBarProps {
  currentPage: number
  isNextDisabled: boolean
  isPreviousDisable: boolean
  lastPage: number | undefined
  onClickNext: () => void
  onClickPrevious: () => void
}

const Pagination: React.FC<PaginationBarProps> = ({
  currentPage,
  isNextDisabled,
  isPreviousDisable,
  lastPage,
  onClickNext,
  onClickPrevious,
}) => {
  return (
    <PaginationStyled>
      <FlexBox alignItems="center" justifyContent="center" fullWidth>
        <Button
          onClick={onClickPrevious}
          disabled={isPreviousDisable}
          size="small"
        >
          <Text typography="normal">Previous</Text>
        </Button>
        <Spacer level={3} isHorizontal />
        <Text typography="normal" usage="bold">
          {currentPage}
        </Text>
        {lastPage && (
          <Text typography="normal" usage="bold">
            &nbsp;{`/ ${lastPage}`}
          </Text>
        )}
        <Spacer level={3} isHorizontal />
        <Button onClick={onClickNext} disabled={isNextDisabled} size="small">
          <Text typography="normal">Next</Text>
        </Button>
      </FlexBox>
    </PaginationStyled>
  )
}

export default Pagination
