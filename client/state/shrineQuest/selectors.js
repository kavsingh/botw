import { includes, get, pipe, placeholder as _ } from 'lodash/fp'
import { getCompletedShrineQuestIds } from '../stats/selectors'

const rootSelect = get('shrineQuest')

const getShrineQuestIds = pipe(rootSelect, get('ids'))

export const getShrineQuestsById = pipe(rootSelect, get('byId'))

export const getShrineQuests = state => {
  const ids = getShrineQuestIds(state)
  const byId = getShrineQuestsById(state)

  return ids.map(id => byId[id])
}

export const getShrineQuestsWithCompletions = state => {
  const completeIds = getCompletedShrineQuestIds(state)
  const isComplete = includes(_, completeIds)

  return getShrineQuests(state).map(
    quest => ({ ...quest, complete: isComplete(quest.id) }))
}
