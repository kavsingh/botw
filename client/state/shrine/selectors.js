import { includes, get, pipe, placeholder as _ } from 'lodash/fp'
import { getShrineQuestsById } from '../shrineQuest/selectors'
import { getCompletedShrineIds } from '../stats/selectors'

const rootSelect = get('shrine')

const getShrineIds = pipe(rootSelect, get('ids'))

export const getShrinesById = pipe(rootSelect, get('byId'))

export const getShrines = state => {
  const ids = getShrineIds(state)
  const byId = getShrinesById(state)
  const questsById = getShrineQuestsById(state)

  return ids.map(id => {
    const shrine = byId[id]
    return {
      ...shrine,
      shrineQuests: (shrine.shrineQuests || [])
        .map(qid => (questsById[qid] || {}).name),
    }
  })
}

export const getShrinesWithCompletions = state => {
  const completeIds = getCompletedShrineIds(state)
  const isComplete = includes(_, completeIds)

  return getShrines(state).map(
    quest => ({ ...quest, complete: isComplete(quest.id) }))
}
