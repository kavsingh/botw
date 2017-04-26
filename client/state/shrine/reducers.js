import { merge, union } from 'lodash/fp'
import { RECEIVE_SHRINES } from './actionTypes'

const receiveShrines = (state, { shrines = [] } = {}) => ({
  ...state,
  ids: union(state.quests, shrines.map(({ id }) => id)),
  byId: merge(state.byId, shrines.reduce((byId, shrine) => {
    Object.assign(byId, { [shrine.id]: shrine })
    return byId
  }, {})),
})

export const shrine = (
  state = { byId: {}, ids: [] },
  { type, payload = {} } = {},
) => {
  switch (type) {
    case RECEIVE_SHRINES:
      return receiveShrines(state, payload)
    default:
      return state
  }
}
