import nock from 'nock'
import { renderHook } from '@testing-library/react-hooks'
// Constants
import { APIS } from '../../../constants'
// Hooks
import useAPI from '../'
// Enums
import { REQUEST_STATE } from '../../../enums'
// Mocks
import { mockCharacters, mockEpisodes, mockLocations } from '../../../__mocks__/apiResponses'

describe('useAPI hook: ', () => {
	const {result} = renderHook(() => useAPI())

	beforeEach(() => {
		nock.disableNetConnect()
	})

	afterEach(() => {
		nock.cleanAll()
	})

	it('should fetch characters correctly', async () => {
		nock(APIS.BASE_URL)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
				'access-control-allow-credentials': 'true' 
			})
			.get(`${APIS.CHARACTER}/?page=0`)
			.reply(200, mockCharacters)

		const { fetchPageCharacters } = result.current
    
		const { status, data } = await fetchPageCharacters(0)

		expect(status).toBe(REQUEST_STATE.SUCCESS)
		expect(JSON.stringify(data)).toBe(JSON.stringify(mockCharacters))
	})
	it('should fetch locations correctly', async () => {
		nock(APIS.BASE_URL)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
				'access-control-allow-credentials': 'true' 
			})
			.get(`${APIS.LOCATION}/1,2`)
			.reply(200, mockLocations)

		const { fetchMultipleLocations } = result.current
    
		const { status, data } = await fetchMultipleLocations([1, 2])

		expect(status).toBe(REQUEST_STATE.SUCCESS)
		expect(JSON.stringify(data)).toBe(JSON.stringify(mockLocations))
	})
	it('should fetch episodes correctly', async () => {
		nock(APIS.BASE_URL)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
				'access-control-allow-credentials': 'true'
			})
			.get(`${APIS.EPISODE}/1,2`)
			.reply(200, mockEpisodes)

		const { fetchMultipleEpisodes } = result.current
    
		const { status, data } = await fetchMultipleEpisodes([1, 2])

		expect(status).toBe(REQUEST_STATE.SUCCESS)
		expect(JSON.stringify(data)).toBe(JSON.stringify(mockEpisodes))
	})
	it('should return only status with error if status code is different than 200', async () => {
		jest.spyOn(window.console, 'error').mockImplementation()

		nock(APIS.BASE_URL)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
				'access-control-allow-credentials': 'true' 
			})
			.get(`${APIS.CHARACTER}/?page=0`)
			.reply(202, mockCharacters)

		const { fetchPageCharacters } = result.current
    
		const { status, data } = await fetchPageCharacters(0)

		expect(status).toBe(REQUEST_STATE.ERROR)
		expect(data).toBeUndefined()
	})
	it('should return only status with error when there is an error', async () => {
		jest.spyOn(window.console, 'error').mockImplementation()

		nock(APIS.BASE_URL)
			.get(`${APIS.CHARACTER}/?page=0`)
			.reply(500, mockCharacters)

		const { fetchPageCharacters } = result.current
    
		const { status, data } = await fetchPageCharacters(0)

		expect(status).toBe(REQUEST_STATE.ERROR)
		expect(data).toBeUndefined()
	})
})