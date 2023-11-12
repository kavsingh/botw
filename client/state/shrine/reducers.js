import { merge, union } from 'lodash/fp'
import { RECEIVE_SHRINES } from './actionTypes'

const receiveShrines = (state, { shrines = {} } = {}) => ({
  ...state,
  ids: union(state.ids, Object.keys(shrines)),
  byId: merge(state.byId, shrines),
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
