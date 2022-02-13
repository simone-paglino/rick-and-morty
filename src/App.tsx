import React from 'react'
import Card from './components/organisms/Card'
import { GENDER, STATUS_CHARACTER } from './enums'

const App: React.FC = () => {
	const character = {
		id: 1,
		name: 'Name of card',
		gender: GENDER.MALE,
		status: STATUS_CHARACTER.ALIVE,
		type: 'Type card',
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
	}

	return (
		<div>
			<Card
				character={character}
			/>
		</div>
	)
}

export default App
