import { useEffect } from 'react'
import { APIS } from '../helpers/constants'
import useAPI, { ApiState } from './useAPI'

type UseEpisodes = (params: {
  listEpisodes: number[]
  lazyFetch?: boolean
}) => ApiState<{
  episodes: string[]
}>

type EpisodesApiResultDataType = Array<{
  id: number
  name: string
  air_date: string
  episode: string
}>

export const useEpisodes: UseEpisodes = ({
  listEpisodes,
  lazyFetch = false,
}) => {
  const [get, { data, errors, status }] = useAPI<EpisodesApiResultDataType>()

  // TODO: Try to implement a 'skip' field inside the useApi hook somewhere to avoid always calling the hook
  useEffect(() => {
    if (!lazyFetch) {
      get({
        url: `${APIS.EPISODE}/[${listEpisodes}]`,
      })
    }
  }, [JSON.stringify(listEpisodes), lazyFetch])

  const episodes = (data ?? []).map(
    ({ name, episode }) => `${name} - ${episode}`
  )

  return {
    data: {
      episodes,
    },
    status,
    errors,
  }
}
