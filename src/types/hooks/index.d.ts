// Enums
import { GENDER, REQUEST_STATE, STATUS_CHARACTER } from '../../enums'
// Types
import { CardProps, EpisodeDetails, LocationDetails } from '../organisms'
import { AllLocationsAndEpisodesForCharacterType, DictionaryByIndex, getLocationsAndEpisodesForCharactersType } from '../templates'

export type APIResponsePaginationInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type APIResponse<T> = {
  status: REQUEST_STATE;
  data?: T;
}

export type SingleCharacterDetailsAPIResponse = {
  id: number;
  name: string;
  status: STATUS_CHARACTER;
  species: string;
  type: string;
  gender: GENDER;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type CharacterAPIResponse = {
  info: APIResponsePaginationInfo;
  results: SingleCharacterDetailsAPIResponse[];
}

export type LocationAPIResponse = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type EpisodeAPIResponse = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type useAPIType = {
  fetchPageCharacters: (pageNumber: number) => Promise<APIResponse<CharacterAPIResponse>>;
  fetchMultipleLocations: (locationsIdsToFetch: number[]) => Promise<APIResponse<LocationAPIResponse[]>>;
  fetchMultipleEpisodes: (episodesIdsToFetch: number[]) => Promise<APIResponse<EpisodeAPIResponse[]>>;
}

export type useCharactersPaginationType = {
  getLocationsAndEpisodesForCharacters: (
    characters: SingleCharacterDetailsAPIResponse[]
  ) => getLocationsAndEpisodesForCharactersType;
  getAllLocationsAndEpisodesForCharacter: (
    locationsAndEpisodes: getLocationsAndEpisodesForCharactersType
  ) => AllLocationsAndEpisodesForCharacterType;
  getIdsLocationOrEpisodeNotFetchedYet: (
    ids: number[],
    dictionary: DictionaryByIndex<LocationDetails | EpisodeDetails>
  ) => number[];
  getLocationsFetched: (idsLocations: number[]) => Promise<DictionaryByIndex<LocationDetails>>;
  getEpisodesFetched: (idsEpisodes: number[]) => Promise<DictionaryByIndex<EpisodeDetails>>;
  getArrayCardsProps: (
    characters: SingleCharacterDetailsAPIResponse[],
    locationsAndEpisodes: getLocationsAndEpisodesForCharactersType,
    locationsFormatted: DictionaryByIndex<LocationDetails>,
    episodesFormatted: DictionaryByIndex<EpisodeDetails>,
    paginationNum: number
  ) => DictionaryByIndex<CardProps[]>;
}