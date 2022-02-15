// Types
import {CardProps, LocationDetails, EpisodeDetails} from '../organisms'

export type DictionaryByIndex<T> = { [fieldName: number]: T }

export type DataFetchedCardsAPI = {
  locations: DictionaryByIndex<LocationDetails>;
  episodes: DictionaryByIndex<EpisodeDetails>;
}

export type CardsState = DictionaryByIndex<CardProps[]>

export type PaginationDetailsType = {
  maxPages: number;
  currentPage: number;
}