import nock from 'nock'
import { renderHook } from '@testing-library/react-hooks'
// Hooks
import useCharactersPagination, { getIdFromUrl } from '../'
// Mocks
import { mockCharacters, mockEpisodes, mockLocations } from '../../../__mocks__/apiResponses'
import { mockAllEpisodes, mockAllLocations, mockAllLocationsAndEpisodesCharacter, mockArrayCardsProps, mockDictionaryLocations, mockEpisodesFetched, mockFilteredLocations, mockLocationsAndEpisodesCharacter, mockLocationsFetched } from '../../../__mocks__/characterPagination'
import { APIS } from '../../../constants'

describe('useCharacterPagination hook: ', () => {
	const { result } = renderHook(() => useCharactersPagination())
  
	describe('getIdFromUrl method: ', () => {
		it('should return a number bigger than -1 if url if correct', () => {
			const id = getIdFromUrl('https://rickandmortyapi.com/api/character/2')

			expect(id).toBe(2)
		})
		it('should return -1 if url if wrong', () => {
			const id = getIdFromUrl('https://rickandmortyapi.com/api/character/')

			expect(id).toBe(-1)
		})
	})
	describe('getLocationsAndEpisodesForCharacters method: ', () => {
		const { getLocationsAndEpisodesForCharacters } = result.current

		it('should return expected output', () => {
			const locationsAndEpisodes = getLocationsAndEpisodesForCharacters(mockCharacters.results)

			expect(JSON.stringify(locationsAndEpisodes)).toBe(JSON.stringify(mockLocationsAndEpisodesCharacter))
		})
		it('should return empty array', () => {
			const locationsAndEpisodes = getLocationsAndEpisodesForCharacters([])

			expect(Object.keys(locationsAndEpisodes)).toHaveLength(0)
		})
	})
	describe('getAllLocationsAndEpisodesForCharacter method: ', () => {
		const { getAllLocationsAndEpisodesForCharacter } = result.current

		it('should return expected output', () => {
			const allLocationsAndEpisodes = getAllLocationsAndEpisodesForCharacter(mockLocationsAndEpisodesCharacter)

			expect(JSON.stringify(allLocationsAndEpisodes)).toBe(JSON.stringify(mockAllLocationsAndEpisodesCharacter))
		})
		it('should return object with empty arrays', () => {
			const allLocationsAndEpisodes = getAllLocationsAndEpisodesForCharacter({})

			expect(JSON.stringify(allLocationsAndEpisodes)).toBe(JSON.stringify({
				idsLocation: [],
				idsEpisodes: []
			}))
		})
	})
	describe('getIdsLocationOrEpisodeNotFetchedYet method: ', () => {
		const { getIdsLocationOrEpisodeNotFetchedYet } = result.current

		it('should return expected output', () => {
			const resultFilteredLocations = getIdsLocationOrEpisodeNotFetchedYet(
				mockAllLocationsAndEpisodesCharacter.idsLocation,
				mockDictionaryLocations
			)

			expect(JSON.stringify(resultFilteredLocations)).toBe(JSON.stringify(mockFilteredLocations))
		})
		it('should return empty array', () => {
			const resultFilteredLocations = getIdsLocationOrEpisodeNotFetchedYet([], mockDictionaryLocations)

			expect(resultFilteredLocations).toHaveLength(0)
		})
	})
	describe('getLocationsFetched method: ', () => {
		const { getLocationsFetched } = result.current

		afterEach(() => {
			nock.cleanAll()
		})

		it('should return expected output', async () => {
			nock(APIS.BASE_URL)
				.defaultReplyHeaders({
					'access-control-allow-origin': '*',
					'access-control-allow-credentials': 'true' 
				})
				.get(`${APIS.LOCATION}/1,2`)
				.reply(200, mockLocations)

			const fetchedLocations = await getLocationsFetched([1, 2])

			expect(JSON.stringify(fetchedLocations)).toBe(JSON.stringify(mockLocationsFetched))
		})
		it('should return empty object if data fetched is undefined', async () => {
			nock(APIS.BASE_URL)
				.get(`${APIS.LOCATION}/1,2`)
				.reply(200, mockLocations)

			const fetchedLocations = await getLocationsFetched([1, 2])

			expect(Object.keys(fetchedLocations)).toHaveLength(0)
		})
		it('should return empty object if argument is an empty array', async () => {
			const fetchedLocations = await getLocationsFetched([])

			expect(Object.keys(fetchedLocations)).toHaveLength(0)
		})
	})
	describe('getEpisodesFetched method: ', () => {
		const { getEpisodesFetched } = result.current

		afterEach(() => {
			nock.cleanAll()
		})

		it('should return expected output', async () => {
			nock(APIS.BASE_URL)
				.defaultReplyHeaders({
					'access-control-allow-origin': '*',
					'access-control-allow-credentials': 'true' 
				})
				.get(`${APIS.EPISODE}/1,2`)
				.reply(200, mockEpisodes)

			const fetchedEpisodes = await getEpisodesFetched([1, 2])

			expect(JSON.stringify(fetchedEpisodes)).toBe(JSON.stringify(mockEpisodesFetched))
		})
		it('should return empty object if data fetched is undefined', async () => {
			nock(APIS.BASE_URL)
				.get(`${APIS.EPISODE}/1,2`)
				.reply(400, mockEpisodes)

			const fetchedEpisodes = await getEpisodesFetched([1, 2])

			expect(Object.keys(fetchedEpisodes)).toHaveLength(0)
		})
		it('should return empty object if argument is an empty array', async () => {
			const fetchedEpisodes = await getEpisodesFetched([])

			expect(Object.keys(fetchedEpisodes)).toHaveLength(0)
		})
	})
	describe('getArrayCardsProps method: ', () => {
		const { getArrayCardsProps } = result.current

		it('should return the expected output', () => {
			const resultCardsProps = getArrayCardsProps(
				mockCharacters.results,
				mockLocationsAndEpisodesCharacter,
				mockAllLocations,
				mockAllEpisodes,
				1
			)

			expect(JSON.stringify(resultCardsProps)).toBe(JSON.stringify(mockArrayCardsProps))
		})
	})
})