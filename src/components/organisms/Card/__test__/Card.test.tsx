import React from 'react'
import { render, act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Organisms
import Card from '../'
import { GENDER, STATUS_CHARACTER } from '../../../../enums'

const mockCharacter = {
	id: 1,
	name: 'Name of card',
	gender: GENDER.MALE,
	status: STATUS_CHARACTER.ALIVE,
	type: 'Type card',
	image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	numEpisodes: 12
}

const mockLocation = {
	id: 1,
	name: 'Name unknown',
	type: 'Type unknown',
	dimension: 'Dimension unknown',
	residents: 200
}

const mockEpisodes = [
	'episode1',
	'episode2',
	'episode3',
	'episode4'
]

describe('Card component: ', () => {
	it('should render more-info section collapse', () => {
		render(<Card character={mockCharacter} />)

		const collapseElement = document.querySelector('div.card__more-info')

		expect(collapseElement).toHaveClass('collapse--close')
	})
	it('should render the location, origin and the list of episodes', () => {
		render(
			<Card
				character={mockCharacter}
				location={mockLocation}
				origin={mockLocation}
				episodes={mockEpisodes}
			/>
		)

		const locationName = screen.getByText(/location name:/i)
		const originName = screen.getByText(/origin name:/i)
		const listItems = screen.getAllByRole('listitem', { hidden: true })

		expect(locationName).toBeInTheDocument()
		expect(originName).toBeInTheDocument()
		expect(listItems).toHaveLength(mockEpisodes.length)
	})
	it('should render a loading text if data is not ready yet', () => {
		render(<Card character={mockCharacter} />)

		const loadingLocation = screen.getByText(/Location unknown/i)
		const loadingOrigin = screen.getByText(/Origin unknown/i)
		const loadingEpisode = screen.getByText(/No episodes/i)

		expect(loadingLocation).toBeInTheDocument()
		expect(loadingOrigin).toBeInTheDocument()
		expect(loadingEpisode).toBeInTheDocument()
	})
	it('should toggle icon to show more content', () => {
		render(<Card character={mockCharacter} />)

		const iconShowMore = screen.getByTestId('plus-icon')

		expect(iconShowMore).toBeInTheDocument()

		act(() => {
			userEvent.click(iconShowMore)
		})

		const collapseElement = document.querySelector('div.card__more-info')
		const iconShowLess = screen.getByTestId('minus-icon')

		expect(collapseElement).toHaveClass('collapse--open')
		expect(iconShowLess).toBeInTheDocument()
	})
})