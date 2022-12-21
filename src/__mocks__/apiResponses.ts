// Enums
import { GENDER, STATUS_CHARACTER } from '../enums'
// Types
import { CharacterAPIResponse } from '../types/hooks'

export const mockCharacters: CharacterAPIResponse = {
  info: {
    count: 826, pages: 42, next: 'https://rickandmortyapi.com/api/character/?page=2', prev: null
  },
  results: [
    {
      id: 1, name: 'Rick Sanchez', status: STATUS_CHARACTER.ALIVE, species: 'Human', type: '', gender: GENDER.MALE,
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/31',
        'https://rickandmortyapi.com/api/episode/32'],
      url: 'https://rickandmortyapi.com/api/character/1', created: '2017-11-04T18:48:46.250Z'
    },
    {
      id: 2, name: 'Morty Smith', status: STATUS_CHARACTER.ALIVE, species: 'Human', type: '', gender: GENDER.MALE,
      origin: { name: 'unknown', url: '' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3'],
      url: 'https://rickandmortyapi.com/api/character/2', created: '2017-11-04T18:50:21.651Z'
    }
  ]
}

export const mockLocations = [
  {
    id: 1,
    name: 'Earth (C-137)',
    type: 'Planet',
    dimension: 'Dimension C-137',
    residents: [
      'https://rickandmortyapi.com/api/character/38',
      'https://rickandmortyapi.com/api/character/45'
    ],
    url: 'https://rickandmortyapi.com/api/location/1',
    created: '2017-11-10T12:42:04.162Z'
  },
  {
    id: 2,
    name: 'Abadango',
    type: 'Cluster',
    dimension: 'unknown',
    residents: [
      'https://rickandmortyapi.com/api/character/6'
    ],
    url: 'https://rickandmortyapi.com/api/location/2',
    created: '2017-11-10T13:06:38.182Z'
  }
]

export const mockEpisodes = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2',
      'https://rickandmortyapi.com/api/character/35'
    ],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z'
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
    characters: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2'
    ],
    url: 'https://rickandmortyapi.com/api/episode/2',
    created: '2017-11-10T12:56:33.916Z'
  }
]