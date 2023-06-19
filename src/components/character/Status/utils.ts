import { CharacterStatusType } from '../../../types/characters'

export const getStatusColorKey = (status: CharacterStatusType) => {
  switch (status) {
    case 'unknown':
      return 'yellow'
    case 'Alive':
      return 'green'
    case 'Dead':
      return 'red'
    default:
      return 'black'
  }
}
