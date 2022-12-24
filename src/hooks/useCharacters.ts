import { useEffect } from 'react'
import { APIS } from '../constants'
import useAPI, { ApiState } from './useAPI'
import { CharacterGender, CharacterStatus } from '../types'

type Pagination = {
  paginationNumber: number
}

export type APICharacter = {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: Array<string>
  url: string
}

// TODO: Return also these fields for the navigation
type ApiResultDataType = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Array<APICharacter>
}

type AllCharacters = Array<
  Omit<APICharacter, 'episode'> & {
    episode: Array<number>
  }
>

type UseCharactersResultType = {
  charactersPageList: AllCharacters
  isNext: boolean
  isPrevious: boolean
}

type UseCharacters = (params: {
  pagination: Pagination
}) => ApiState<UseCharactersResultType>

export const useCharacters: UseCharacters = ({ pagination }) => {
  const [get, { data, errors, status }] = useAPI<ApiResultDataType>()

  // TODO: Try to implement a 'skip' field inside the useApi hook somewhere to avoid always calling the hook
  useEffect(() => {
    get({
      url: `${APIS.CHARACTER}/?page=${pagination.paginationNumber}`,
    })
  }, [pagination.paginationNumber])

  const { results, info } = data ?? {}

  if (status === 'SUCCESS' && results && results.length > 0) {
    const charactersPageList: AllCharacters = results.map(
      ({ episode, ...rest }) => {
        const episodesIds = episode
          ?.map((episodeUrl) => {
            const extractEpisodeId = /episode\/([\d]+$)/

            const episodeId = extractEpisodeId.exec(episodeUrl)?.[1] ?? '-1'

            return Number.parseInt(episodeId)
          })
          .filter((episodeId) => episodeId !== -1) as Array<number>

        return {
          ...rest,
          episode: episodesIds,
        }
      }
    )

    return {
      data: {
        charactersPageList,
        isNext: Boolean(info?.next),
        isPrevious: Boolean(info?.prev),
      },
      status,
      errors,
    }
  }

  return {
    data: null,
    status,
    errors,
  }
}
