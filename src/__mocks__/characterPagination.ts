// Types
import { GENDER, STATUS_CHARACTER } from '../enums'
import { CardProps, EpisodeDetails, LocationDetails } from '../types/organisms'
import {
	AllLocationsAndEpisodesForCharacterType,
	DictionaryByIndex,
	getLocationsAndEpisodesForCharactersType
} from '../types/templates'
import { omit } from '../utils'
import { mockCharacters } from './apiResponses'

export const mockLocationsAndEpisodesCharacter: getLocationsAndEpisodesForCharactersType = {
	1: {
		idsLocation: [3, 1],
		idsEpisodes: [31, 32]
	},
	2: {
		idsLocation: [3, -1],
		idsEpisodes: [1, 2, 3]
	}
}

export const mockAllLocationsAndEpisodesCharacter: AllLocationsAndEpisodesForCharacterType = {
	idsLocation: [3, 1, 3, -1],
	idsEpisodes: [31, 32, 1, 2, 3]
}

export const mockDictionaryLocations: DictionaryByIndex<LocationDetails> = {
	3: {
		id: 3,
		name: 'Location3',
		type: 'Type3',
		dimension: 'Dimension3',
		residents: 50
	}
}

export const mockDictionaryEpisodes: DictionaryByIndex<EpisodeDetails> = {
	32: {
		id: 32,
		name: 'Episode32'
	}
}

export const mockFilteredLocations: number[] = [1, -1]
export const mockFilteredEpisodes: number[] = [31, 32, 1, 2, 3]

export const mockLocationsFetched: DictionaryByIndex<LocationDetails> = {
	1: {
		id: 1,
		name: 'Earth (C-137)',
		type: 'Planet',
		dimension: 'Dimension C-137',
		residents: 2
	},
	2: {
		id: 2,
		name: 'Abadango',
		type: 'Cluster',
		dimension: 'unknown',
		residents: 1
	},
}

export const mockEpisodesFetched: DictionaryByIndex<EpisodeDetails> = {
	1: {
		id: 1,
		name: 'Pilot'
	},
	2: {
		id: 2,
		name: 'Lawnmower Dog'
	},
}

export const mockAllLocations: DictionaryByIndex<LocationDetails> = {
	...mockLocationsFetched,
	...mockDictionaryLocations
}

export const mockAllEpisodes: DictionaryByIndex<EpisodeDetails> = {
	...mockEpisodesFetched,
	...mockDictionaryEpisodes,
	3: {
		id: 3,
		name: 'Name episode 3'
	},
	31: {
		id: 31,
		name: 'Name episode 31'
	},
}

export const mockArrayCardsProps: DictionaryByIndex<CardProps[]> = {
	1: [
		{
			character: {
				id: 1,
				name: 'Rick Sanchez',
				status: STATUS_CHARACTER.ALIVE,
				type: '',
				gender: GENDER.MALE,
				image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
			},
			location: mockAllLocations[3],
			origin: mockAllLocations[1],
			episodes: [mockAllEpisodes[31].name, mockAllEpisodes[32].name]
		},
		{
			character: {
				id: 2,
				name: 'Morty Smith',
				status: STATUS_CHARACTER.ALIVE,
				type: '',
				gender: GENDER.MALE,
				image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
			},
			location: mockAllLocations[3],
			origin: mockAllLocations[-1],
			episodes: [mockAllEpisodes[1].name, mockAllEpisodes[2].name, mockAllEpisodes[3].name]
		}
	]
}