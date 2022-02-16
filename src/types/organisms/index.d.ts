// Types
import { LocationAPIResponse, EpisodeAPIResponse, SingleCharacterDetailsAPIResponse } from '../hooks'

export type CharacterDetails = Pick<
  SingleCharacterDetailsAPIResponse,
  'id' | 'name' | 'type' | 'status' | 'gender' | 'image'
>

export type LocationDetails = Pick<LocationAPIResponse, 'id' | 'name' | 'type' | 'dimension'> & {
  residents: number;
}

export type EpisodeDetails = Pick<EpisodeAPIResponse, 'id' | 'name'>

export type CardProps = {
  character: CharacterDetails;
  location?: LocationDetails;
  origin: LocationDetails;
  episodes: string[];
}