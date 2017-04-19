import { fetchShrineQuests } from './shrineQuest/actions'
import { fetchStats } from './stats/actions'

export const initFetch = () => dispatch => {
  fetchShrineQuests()(dispatch)
  fetchStats()(dispatch)
}
