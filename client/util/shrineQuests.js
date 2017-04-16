import {
  fetchShrineQuests,
  fetchStats,
  saveShrineQuestCompletion,
} from './api'

let cachedQuests = []

const assignComplete = (completed, quests) => {
  const isComplete = ({ id }) => completed.includes(id)
  const complete = val => quest => ({ ...quest, complete: val })
  return quests.map(quest => complete(isComplete(quest))(quest))
}

export const fetchData = async () => {
  const [shrineQuests, { completedShrineQuests = [] }] = await Promise.all([
    fetchShrineQuests(),
    fetchStats(),
  ])

  cachedQuests = shrineQuests

  return {
    shrineQuests: assignComplete(completedShrineQuests, shrineQuests),
  }
}

export const saveShrineQuestComplete = async ({ id, complete }) => {
  const { completedShrineQuests = [] } =
    await saveShrineQuestCompletion(id, complete)

  return {
    shrineQuests: assignComplete(completedShrineQuests, cachedQuests),
  }
}
