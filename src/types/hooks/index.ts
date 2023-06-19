import { REQUEST_STATE } from '../api'

export type APIResponsePaginationInfo = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type APIResponse<T> = {
  status: REQUEST_STATE
  data?: T
}

export type SingleCharacterDetailsAPIResponse = {
  id: number
  name: string
  species: string
  type: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharacterAPIResponse = {
  info: APIResponsePaginationInfo
  results: SingleCharacterDetailsAPIResponse[]
}

export type LocationAPIResponse = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export type EpisodeAPIResponse = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export type useAPIType = {
  fetchPageCharacters: (
    pageNumber: number
  ) => Promise<APIResponse<CharacterAPIResponse>>
  fetchMultipleLocations: (
    locationsIdsToFetch: number[]
  ) => Promise<APIResponse<LocationAPIResponse[]>>
  fetchMultipleEpisodes: (
    episodesIdsToFetch: number[]
  ) => Promise<APIResponse<EpisodeAPIResponse[]>>
}
