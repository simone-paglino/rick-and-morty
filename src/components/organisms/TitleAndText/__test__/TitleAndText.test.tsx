import React from 'react'
import { render, screen } from '@testing-library/react'
// Organisms
import TitleAndText from '../'

describe('TitleAndText component: ', () => {
  it('should render bold and standard title with className', () => {
    render(<TitleAndText boldText='test bold' standardText='test standard' className='mt--1' />)

    const boldText = screen.getByText(/test bold/i)
    const standardText = screen.getByText(/test standard/i)
    
    expect(boldText).toBeInTheDocument()
    expect(standardText).toBeInTheDocument()
    expect(standardText.parentElement).toHaveClass('mt--1')
  })
  it('should render without className', () => {
    render(<TitleAndText boldText='test bold' />)

    const boldText = screen.getByText(/test bold/i)
    const paragraphClassName = boldText.parentElement?.className

    expect(boldText).toBeInTheDocument()
    expect(paragraphClassName).toHaveLength(0)
  })
  it('should render without standard title and className', () => {
    render(<TitleAndText boldText='test bold' />)

    const boldText = screen.getByText(/test bold/i)
    
    expect(boldText.parentElement?.childElementCount).toBe(1)
  })
})