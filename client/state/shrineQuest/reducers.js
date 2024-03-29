import { merge, union } from 'lodash/fp'
import { RECEIVE_SHRINE_QUESTS } from './actionTypes'

const receiveQuests = (state, { shrineQuests = {} } = {}) => ({
  ...state,
  ids: union(state.ids, Object.keys(shrineQuests)),
  byId: merge(state.byId, shrineQuests),
})

export const shrineQuest = (
  state = { byId: {}, ids: [] },
  { type, payload = {} } = {},
) => {
  switch (type) {
    case RECEIVE_SHRINE_QUESTS:
      return receiveQuests(state, payload)
    default:
      return state
  }
}
