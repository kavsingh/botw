import { fetchShrineQuests as _fetch } from '../../util/api'
import {
  REQUEST_SHRINE_QUESTS,
  REQUEST_SHRINE_QUESTS_ERROR,
  RECEIVE_SHRINE_QUESTS,
} from './actionTypes'

const receiveShrineQuests = shrineQuests => ({
  type: RECEIVE_SHRINE_QUESTS,
  payload: { shrineQuests },
})

const requestShrineQuestsError = error => ({
  type: REQUEST_SHRINE_QUESTS_ERROR,
  payload: { error },
})

export const fetchShrineQuests = () => dispatch => {
  dispatch({ type: REQUEST_SHRINE_QUESTS })
  _fetch()
    .then(quests => dispatch(receiveShrineQuests(quests)))
    .catch(error => dispatch(requestShrineQuestsError(error)))
}
