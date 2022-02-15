import axios, { AxiosError, AxiosResponse } from 'axios'
// Constants
import { APIS } from '../../constants'
// Context
import { useAPIContext } from '../../context/APIContext'
// Enums
import { REQUEST_STATE } from '../../enums'
// Types
import {
	APIResponse,
	CharacterAPIResponse,
	EpisodeAPIResponse,
	LocationAPIResponse,
	useAPIType
} from '../../types/hooks'

const axiosInstance = axios.create({
	baseURL: APIS.BASE_URL,
	headers: {
		Accept: 'application/json'
	}
})

const useAPI = (): useAPIType => {
	const { setRequestState } = useAPIContext()

	const handleResponseAPI = async <T = unknown> (
		APIRequest: Promise<AxiosResponse>,
		errorMessage: string
	): Promise<APIResponse<T>> => {
		return APIRequest
			.then(({ data, status }) => {
				if (status === 200) {
					setRequestState(REQUEST_STATE.SUCCESS)
					return { data, status: REQUEST_STATE.SUCCESS }
				}
				setRequestState(REQUEST_STATE.ERROR)
				return { status: REQUEST_STATE.ERROR }
			})
			.catch((error: Error | AxiosError) => {
				console.error(`${errorMessage} => ${error}`)
				setRequestState(REQUEST_STATE.ERROR)
				return { status: REQUEST_STATE.ERROR }
			})
	}

	const fetchPageCharacters = async (pageNumber: number): Promise<APIResponse<CharacterAPIResponse>> => {
		setRequestState(REQUEST_STATE.LOADING)

		const APIRequest = axiosInstance.get(`${APIS.CHARACTER}/?page=${pageNumber}`)

		return handleResponseAPI(APIRequest, 'Error while fetching characters')
	}

	const fetchMultipleLocations = async (locationsIdsToFetch: number[]): Promise<APIResponse<LocationAPIResponse[]>> => {
		setRequestState(REQUEST_STATE.LOADING)

		const APIRequest = axiosInstance.get(`${APIS.LOCATION}/${locationsIdsToFetch}`)

		return handleResponseAPI(APIRequest, 'Error while fetching location')
	}

	const fetchMultipleEpisodes = async (episodesIdsToFetch: number[]): Promise<APIResponse<EpisodeAPIResponse[]>> => {
		setRequestState(REQUEST_STATE.LOADING)

		const APIRequest = axiosInstance.get(`${APIS.LOCATION}/${episodesIdsToFetch}`)

		return handleResponseAPI(APIRequest, 'Error while fetching episodes')
	}

	return {
		fetchPageCharacters,
		fetchMultipleLocations,
		fetchMultipleEpisodes
	}
}

export default useAPI