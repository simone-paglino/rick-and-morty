export type CharacterDetails = {
  id: number;
  name: string;
  type: string;
  status: STATUS_CHARACTER;
  gender: GENDER;
  image: string;
}

export type LocationDetails = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: number;
}

export type EpisodeDetails = {
  id: number;
  name: string;
}

export type CardProps = {
  character: CharacterDetails;
  location: LocationDetails;
  origin: LocationDetails;
  episodes: string[];
}