// Hooks
import useAPI from '../useAPI'
// Types
import { CardProps, CharacterDetails, EpisodeDetails, LocationDetails } from '../../types/organisms'
import { AllLocationsAndEpisodesForCharacterType, DictionaryByIndex, getLocationsAndEpisodesForCharactersType } from '../../types/templates'
import { SingleCharacterDetailsAPIResponse, useCharactersPaginationType } from '../../types/hooks'
// Utils
import { omit } from '../../utils'

export const getIdFromUrl = (url: string): number => {
  const regexToExtractIdFromUrl = /\d+$/
  return parseInt(regexToExtractIdFromUrl.exec(url)?.[0] ?? '-1')
}

const useCharactersPagination = (): useCharactersPaginationType => {
  const { fetchMultipleLocations, fetchMultipleEpisodes } = useAPI()

  const getLocationsAndEpisodesForCharacters = (characters: SingleCharacterDetailsAPIResponse[]): getLocationsAndEpisodesForCharactersType => {
    return characters.reduce((acc, { id, location, origin, episode }) => {
      const idLocation = getIdFromUrl(location.url)
      const idOrigin = getIdFromUrl(origin.url)
      const idsEpisodes = episode.map(urlEpisode => getIdFromUrl(urlEpisode))

      return { ...acc, [id]: { idsLocation: [idLocation, idOrigin], idsEpisodes } }
    }, {})
  }

  const getAllLocationsAndEpisodesForCharacter = (
    locationsAndEpisodes: getLocationsAndEpisodesForCharactersType
  ): AllLocationsAndEpisodesForCharacterType => {
    return Object.values(locationsAndEpisodes).reduce((acc, { idsLocation, idsEpisodes }) => {
      return {
        idsLocation: [
          ...acc.idsLocation,
          ...idsLocation,
        ],
        idsEpisodes: [
          ...acc.idsEpisodes,
          ...idsEpisodes,
        ]
      }
    }, { idsLocation: [], idsEpisodes: [] } as AllLocationsAndEpisodesForCharacterType)
  }

  const getIdsLocationOrEpisodeNotFetchedYet = (
    ids: number[],
    dictionary: DictionaryByIndex<LocationDetails | EpisodeDetails>
  ): number[] => {
    return ids.filter(idToCheck => !dictionary[idToCheck])
  }

  const getLocationsFetched = async (idsLocations: number[]): Promise<DictionaryByIndex<LocationDetails>> => {
    if (idsLocations.length > 0) {
      const { data: locationData } = await fetchMultipleLocations(idsLocations)

      if (locationData) {
        return locationData.reduce((acc, { id, name, type, dimension, residents }) => {
          return { ...acc, [id]: { id, name, type, dimension, residents: residents.length } }
        }, {})
      }
    }
    return {}
  }

  const getEpisodesFetched = async (idsEpisodes: number[]): Promise<DictionaryByIndex<EpisodeDetails>> => {
    if (idsEpisodes.length > 0) {
      const { data: episodesData } = await fetchMultipleEpisodes(idsEpisodes)

      if (episodesData) {
        return episodesData.reduce((acc, { id, name }) => {
          return { ...acc, [id]: { id, name } }
        }, {})
      }
    }
    return {}
  }

  const getArrayCardsProps = (
    characters: SingleCharacterDetailsAPIResponse[],
    locationsAndEpisodes: getLocationsAndEpisodesForCharactersType,
    locationsFormatted: DictionaryByIndex<LocationDetails>,
    episodesFormatted: DictionaryByIndex<EpisodeDetails>,
    paginationNum: number
  ): DictionaryByIndex<CardProps[]> => {
    const cardProps = characters.map((character) => {
      const { idsLocation, idsEpisodes } = locationsAndEpisodes[character.id]

      const location: LocationDetails = locationsFormatted[idsLocation[0]]
      const origin: LocationDetails = locationsFormatted[idsLocation[1]]

      const episodes = idsEpisodes.map(id => episodesFormatted[id].name)

      const characterForCard = omit(character, ['location', 'episode', 'url', 'created', 'origin', 'species'])

      return {
        character: characterForCard as CharacterDetails,
        location,
        origin,
        episodes
      }
    })

    return { [paginationNum]: cardProps }
  }

  return {
    getLocationsAndEpisodesForCharacters,
    getAllLocationsAndEpisodesForCharacter,
    getIdsLocationOrEpisodeNotFetchedYet,
    getLocationsFetched,
    getEpisodesFetched,
    getArrayCardsProps
  }
}

export default useCharactersPagination