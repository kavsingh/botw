const shrines = require('./data/shrines.json')
const shrineQuests = require('./data/shrineQuests.json')
const {
  setShrineCompletion,
  setShrineQuestCompletion,
  readStats,
} = require('./stats')

const getShrines = () => ({
  items: Object.values(shrines).sort(({ id }) => id),
})

const getShrineQuests = () => ({
  items: Object.values(shrineQuests).sort((a, b) => a.order - b.order),
})

module.exports = {
  getShrines,
  getShrineQuests,
  getStats: readStats,
  completeShrine: setShrineCompletion,
  completeShrineQuest: setShrineQuestCompletion,
}
