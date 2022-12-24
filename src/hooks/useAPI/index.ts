import { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
// Constants
import { APIS } from '../../constants'
// Enums
import { REQUEST_STATE } from '../../enums'
// Types
import {
  APIResponse,
  CharacterAPIResponse,
  EpisodeAPIResponse,
  LocationAPIResponse,
  useAPIType,
} from '../../types/hooks'
import { useCache } from '../useCache'

export const axiosInstance = axios.create({
  baseURL: APIS.BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

type ApiStatuses = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

type SUPPORTED_API_STATUS_CODES = 'not_found' | 'generic_error'

type Get = (params: {
  url: string
  errorMessages?: Record<SUPPORTED_API_STATUS_CODES, string>
}) => void

type ApiError = {
  errorMessage: string
  status: SUPPORTED_API_STATUS_CODES
}

export type ApiState<ResultDataType> = {
  status: ApiStatuses
  data: ResultDataType | null | undefined
  errors: ApiError | undefined
}

type HandleApiCaching = (params: { endpoint: string }) => {
  ApiRequest: Promise<AxiosResponse>
  cachedApiResult: string | null
}

type HandleApiRequest = (params: {
  endpoint: string
  errorMessages?: Record<SUPPORTED_API_STATUS_CODES, string>
}) => void

type UseAPIReturnType<ResultDataType> = [
  get: Get,
  apiState: ApiState<ResultDataType>
]

function useAPI<ResultDataType>(): UseAPIReturnType<ResultDataType> {
  const [apiState, setApiState] = useState<ApiState<ResultDataType>>({
    status: 'IDLE',
    data: undefined,
    errors: undefined,
  })

  const { getCachedItem, updateCache } = useCache()

  const updateApiStatus = (status: ApiStatuses) =>
    setApiState((previousState) => ({
      ...previousState,
      status,
    }))

  const handleApiCaching: HandleApiCaching = ({ endpoint }) => {
    const cachedItem = getCachedItem<ResultDataType>({
      key: endpoint,
      parse: false,
    })

    if (cachedItem) {
      setApiState({
        data: JSON.parse(cachedItem as string),
        status: 'SUCCESS',
        errors: undefined,
      })
    }

    return {
      ApiRequest: axiosInstance.get(endpoint),
      cachedApiResult: cachedItem as string,
    }
  }

  const handleApiRequest: HandleApiRequest = ({ endpoint, errorMessages }) => {
    const { ApiRequest, cachedApiResult } = handleApiCaching({
      endpoint,
    })

    return ApiRequest.then(({ data, status }) => {
      const isApiResultsChanged = cachedApiResult !== JSON.stringify(data)

      if (!isApiResultsChanged) {
        return
      }

      updateCache(endpoint, data)

      if (status >= 200 && status < 400) {
        setApiState({
          data,
          status: 'SUCCESS',
          errors: undefined,
        })

        return
      }

      // TODO: Verify if this ERROR is necessary (also the data is never used if the status is ERROR)
      setApiState({
        data,
        status: 'ERROR',
        errors: {
          errorMessage: errorMessages?.not_found ?? "It seems there's no data",
          status: 'not_found',
        },
      })
    }).catch((error: Error | AxiosError) => {
      console.error(`API call errorMessage => ${error}`)

      setApiState({
        data: undefined,
        status: 'ERROR',
        errors: {
          errorMessage:
            errorMessages?.not_found ?? 'Ops.. Something went wrong on our end',
          status: 'generic_error',
        },
      })
    })
  }

  const get: Get = ({ url, errorMessages }) => {
    updateApiStatus('LOADING')

    return handleApiRequest({
      endpoint: url,
      errorMessages,
    })
  }

  return [get, apiState]

  /*
    const handleResponseAPI = async <T = unknown>(
      APIRequest: Promise<AxiosResponse>,
      errorMessage: string
    ): Promise<APIResponse<T>> => {
      return APIRequest.then(({ data, status }) => {
        if (status === 200) {
          return { data, status: REQUEST_STATE.SUCCESS }
        }
        return { status: REQUEST_STATE.ERROR }
      }).catch((error: Error | AxiosError) => {
        console.error(`${errorMessage} => ${error}`)
        return { status: REQUEST_STATE.ERROR }
      })
    }

    const fetchPageCharacters = async (
      pageNumber: number
    ): Promise<APIResponse<CharacterAPIResponse>> => {
      const APIRequest = axiosInstance.get(
        `${APIS.CHARACTER}/?page=${pageNumber}`
      )

      return handleResponseAPI(APIRequest, 'Error while fetching characters')
    }

    const fetchMultipleLocations = async (
      locationsIdsToFetch: number[]
    ): Promise<APIResponse<LocationAPIResponse[]>> => {
      const APIRequest = axiosInstance.get(
        `${APIS.LOCATION}/${locationsIdsToFetch}`
      )

      return handleResponseAPI(APIRequest, 'Error while fetching location')
    }

    const fetchMultipleEpisodes = async (
      episodesIdsToFetch: number[]
    ): Promise<APIResponse<EpisodeAPIResponse[]>> => {
      const APIRequest = axiosInstance.get(
        `${APIS.EPISODE}/${episodesIdsToFetch}`
      )

      return handleResponseAPI(APIRequest, 'Error while fetching episodes')
    }

    return {
      fetchPageCharacters,
      fetchMultipleLocations,
      fetchMultipleEpisodes,
    }
   */
}

export default useAPI
