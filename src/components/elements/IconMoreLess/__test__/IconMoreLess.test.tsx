import React from 'react'
import { render, screen, act, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Elements
import IconMoreLess from '..'

describe('IconMoreLess component: ', () => {
  let mockOnClick: typeof jest.fn

  beforeEach(() => {
    mockOnClick = jest.fn()
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render plus icon if show is false', () => {
    render(<IconMoreLess onClick={mockOnClick} />)
    
    const plusIcon = screen.getByTestId('plus-icon')

    expect(plusIcon).toBeInTheDocument()
  })
  it('should render minus icon if show is true', () => {
    render(<IconMoreLess onClick={mockOnClick} show />)
    
    const plusIcon = screen.getByTestId('minus-icon')

    expect(plusIcon).toBeInTheDocument()
  })
  it('should call onClick function after click', () => {
    render(<IconMoreLess onClick={mockOnClick} />)
    
    const plusIcon = screen.getByTestId('plus-icon')

    act(() => {
      userEvent.click(plusIcon)
    })

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  it('should have className if passed as prop', () => {
    render(<IconMoreLess onClick={mockOnClick} className='custom-css-class' />)
    
    const plusIcon = screen.getByTestId('plus-icon')

    expect(plusIcon).toHaveClass('custom-css-class')
  })
})