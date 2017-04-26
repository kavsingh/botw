import { fetchShrines as _fetch } from '../../util/api'
import {
  REQUEST_SHRINES,
  REQUEST_SHRINES_ERROR,
  RECEIVE_SHRINES,
} from './actionTypes'

const receiveShrines = shrineQuests => ({
  type: RECEIVE_SHRINES,
  payload: { shrineQuests },
})

const requestShrinesError = error => ({
  type: REQUEST_SHRINES_ERROR,
  payload: { error },
})

export const fetchShrines = () => dispatch => {
  dispatch({ type: REQUEST_SHRINES })
  _fetch()
    .then(quests => dispatch(receiveShrines(quests)))
    .catch(error => dispatch(requestShrinesError(error)))
}
