import { RECEIVE_STATS } from './actionTypes'

export const stats = (
  state = { completedShrineQuests: [], completedShrines: [] },
  { type, payload = {} },
) => {
  switch (type) {
    case RECEIVE_STATS:
      return { ...state, ...payload.stats }
    default:
      return state
  }
}
