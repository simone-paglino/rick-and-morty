import React from 'react'
import { render, screen, act, getNodeText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Templates
import ListCards from '..'

describe('ListCards component: ', () => {
	it('should call handleGoToPreviousPage but with disabled button', () => {
		render(<ListCards />)

		const previousButton = screen.getAllByRole('button')[0]
		const getTextCurrentPage = screen.getByText(/^1$/i)

		act(() => {
			userEvent.click(previousButton)
		})

		expect(previousButton).toBeDisabled()
		expect(getNodeText(getTextCurrentPage)).toBe('1')
	})
})