import { Dispatch, SetStateAction } from 'react'
// Enums
import { REQUEST_STATE } from '../../enums'

export type useAPIContextReturnType = {
  requestState: REQUEST_STATE;
  setRequestState: Dispatch<SetStateAction<REQUEST_STATE>>;
}