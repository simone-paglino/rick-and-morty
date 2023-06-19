import { CharacterGender, CharacterStatusType } from '../characters'
import { ApiState } from '../../hooks/useAPI'

export type APICharacter = {
  id: number
  name: string
  status: CharacterStatusType
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

export type ApiResultDataType = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Array<APICharacter>
}

export type AllCharacters = Array<
  Omit<APICharacter, 'episode'> & {
    episode: Array<number>
  }
>

type UseCharactersResultType = {
  charactersPageList: AllCharacters
  isNext: boolean
  isPrevious: boolean
  lastPage: number | undefined
}

export type UseCharacters = (params: {
  pagination: number | undefined
}) => ApiState<UseCharactersResultType>
