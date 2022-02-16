import React from 'react'
import { render, screen, act, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Elements
import Button from '../'

describe('Button component: ', () => {
	let mockOnClick: typeof jest.fn
  
	beforeEach(() => {
		mockOnClick = jest.fn()
	})

	afterEach(() => {
		cleanup()
		jest.clearAllMocks()
	})

	it('should render a button', () => {
		render(<Button onClick={mockOnClick}>Click here</Button>)

		const button = screen.getByRole('button')

		expect(button).toBeInTheDocument()
	})
	it('should be disabled by prop', () => {
		render(<Button onClick={mockOnClick} disabled>Click here</Button>)

		const button = screen.getByRole('button')

		expect(button).toBeDisabled()
	})
	it('should NOT be disabled by default', () => {
		render(<Button onClick={mockOnClick}>Click here</Button>)

		const button = screen.getByRole('button')

		expect(button).not.toBeDisabled()
	})
	it('should call onClick functio passed as prop', () => {
		render(<Button onClick={mockOnClick}>Click here</Button>)

		const button = screen.getByRole('button')
    
		act(() => {
			userEvent.click(button)
		})

		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})
})