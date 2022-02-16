import React from 'react'
import { render, cleanup, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Organisms
import PaginationBar from '../'

describe('PaginationBar component: ', () => {
	let mockOnClickPrevious: typeof jest.fn
	let mockOnClickNext: typeof jest.fn

	beforeEach(() => {
		mockOnClickPrevious = jest.fn()
		mockOnClickNext = jest.fn()
	})

	afterEach(() => {
		cleanup()
		jest.clearAllMocks()
	})


	it('should have both buttons disabled by props true', () => {
		render(
			<PaginationBar
				disableNext={true}
				disablePrevious={true}
				onClickNext={mockOnClickNext}
				onClickPrevious={mockOnClickPrevious}
				pageNumber={0}
			/>
		)
    
		const buttons = screen.getAllByRole('button')

		expect(buttons[0]).toBeDisabled()
		expect(buttons[1]).toBeDisabled()
	})
	it('should have both buttons NOT disabled by default', () => {
		render(
			<PaginationBar
				disableNext={false}
				disablePrevious={false}
				onClickNext={mockOnClickNext}
				onClickPrevious={mockOnClickPrevious}
				pageNumber={0}
			/>
		)
    
		const buttons = screen.getAllByRole('button')

		expect(buttons[0]).not.toBeDisabled()
		expect(buttons[1]).not.toBeDisabled()
	})
	it('should call onClick functions if user clicks buttons', () => {
		render(
			<PaginationBar
				disableNext={false}
				disablePrevious={false}
				onClickNext={mockOnClickNext}
				onClickPrevious={mockOnClickPrevious}
				pageNumber={0}
			/>
		)
    
		const buttons = screen.getAllByRole('button')

		act(() => {
			userEvent.click(buttons[0])
			userEvent.click(buttons[1])
		})

		expect(mockOnClickPrevious).toHaveBeenCalledTimes(1)
		expect(mockOnClickNext).toHaveBeenCalledTimes(1)
	})
	it('should render correct page number', () => {
		render(
			<PaginationBar
				disableNext={true}
				disablePrevious={true}
				onClickNext={mockOnClickNext}
				onClickPrevious={mockOnClickPrevious}
				pageNumber={0}
			/>
		)
    
		const paginationNumber = screen.getByText(/^0$/i)

		expect(paginationNumber).toBeInTheDocument()
	})
})