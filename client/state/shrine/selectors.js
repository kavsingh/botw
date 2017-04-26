import { includes, get, pipe, placeholder as _ } from 'lodash/fp'
import { getCompletedShrineIds } from '../stats/selectors'

const rootSelect = get('shrine')

const getShrineIds = pipe(rootSelect, get('ids'))
const getShrinesById = pipe(rootSelect, get('byId'))

export const getShrines = state => {
  const ids = getShrineIds(state)
  const byId = getShrinesById(state)

  return ids.map(id => byId[id])
}

export const getShrinesWithCompletions = state => {
  const completeIds = getCompletedShrineIds(state)
  const isComplete = includes(_, completeIds)

  return getShrines(state).map(
    quest => ({ ...quest, complete: isComplete(quest.id) }))
}
