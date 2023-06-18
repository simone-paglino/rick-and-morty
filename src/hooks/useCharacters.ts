import { useEffect } from 'react'
import { APIS } from '../constants'
import useAPI from './useAPI'
import {
  AllCharacters,
  ApiResultDataType,
  UseCharacters,
} from '../types/hooks/useCharacters'

export const useCharacters: UseCharacters = ({ pagination }) => {
  const [get, { data, errors, status }] = useAPI<ApiResultDataType>()

  useEffect(() => {
    get({
      skip: !pagination,
      url: `${APIS.CHARACTER}/?page=${pagination}`,
    })
  }, [pagination])

  const { results, info } = data ?? {}

  const charactersPageList: AllCharacters = (results ?? []).map(
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
      lastPage: info?.pages,
    },
    status,
    errors,
  }
}
