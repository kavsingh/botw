import { fetchShrines } from './shrine/actions'
import { fetchShrineQuests } from './shrineQuest/actions'
import { fetchStats } from './stats/actions'

export const initFetch = () => dispatch => {
  fetchShrines()(dispatch)
  fetchShrineQuests()(dispatch)
  fetchStats()(dispatch)
}
