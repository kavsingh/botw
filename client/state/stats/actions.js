import {
  fetchStats as _fetch,
  saveShrineCompletion as _saveShrineCompletion,
  saveShrineQuestCompletion as _saveShrineQuestCompletion,
} from '../../util/api'
import {
  REQUEST_STATS,
  REQUEST_STATS_ERROR,
  RECEIVE_STATS,
  REQUEST_SAVE_SHRINE_COMPLETION,
  REQUEST_SAVE_SHRINE_QUEST_COMPLETION,
} from './actionTypes'

const receiveStats = stats => ({
  type: RECEIVE_STATS,
  payload: { stats },
})

const requestStatsError = error => ({
  type: REQUEST_STATS_ERROR,
  payload: { error },
})

export const fetchStats = () => dispatch => {
  dispatch({ type: REQUEST_STATS })
  _fetch()
    .then(stats => dispatch(receiveStats(stats)))
    .catch(error => dispatch(requestStatsError(error)))
}

export const saveShrineCompletion = (id, complete) => dispatch => {
  dispatch({ type: REQUEST_SAVE_SHRINE_COMPLETION })
  _saveShrineCompletion(id, complete)
    .then(stats => dispatch(receiveStats(stats)))
    .catch(error => dispatch(requestStatsError(error)))
}

export const saveShrineQuestCompletion = (id, complete) => dispatch => {
  dispatch({ type: REQUEST_SAVE_SHRINE_QUEST_COMPLETION })
  _saveShrineQuestCompletion(id, complete)
    .then(stats => dispatch(receiveStats(stats)))
    .catch(error => dispatch(requestStatsError(error)))
}
