const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const { assign, without, union } = require('lodash/fp')
const shrines = require('./data/shrines.json')
const shrineQuests = require('./data/shrineQuests.json')

const statsPath = path.resolve(__dirname, './data/stats.json')
let cachedStats = null

async function readStats() {
  if (cachedStats) return cachedStats
  const raw = await fs.readFileAsync(statsPath, 'utf-8')
  return JSON.parse(raw)
}

async function setShrineQuestCompletion(id, complete) {
  const stats = await readStats()
  const idx = stats.completedShrineQuests.indexOf(id)

  if ((complete && idx !== -1) || (!complete && idx === -1)) return stats

  const relatedShrines = shrineQuests[id].shrines || []
  let newQuests
  let newShrines

  if (complete) {
    newQuests = union(stats.completedShrineQuests, [id])
    newShrines = union(stats.completedShrines, relatedShrines)
  } else {
    newQuests = without([id], stats.completedShrineQuests)
    newShrines = without(relatedShrines, stats.completedShrines)
  }

  cachedStats = assign(stats, {
    completedShrines: newShrines,
    completedShrineQuests: newQuests,
  })

  await fs.writeFileAsync(statsPath, JSON.stringify(cachedStats, null, 2))

  return readStats()
}

async function setShrineCompletion(id, complete) {
  const stats = await readStats()
  const idx = stats.completedShrines.indexOf(id)

  if ((complete && idx !== -1) || (!complete && idx === -1)) return stats

  const relatedQuests = shrines[id].shrineQuests || []
  let newShrines
  let newQuests

  if (complete) {
    newShrines = union(stats.completedShrines, [id])
    newQuests = union(stats.completedShrineQuests, relatedQuests)
  } else {
    newShrines = without([id], stats.completedShrines)
    newQuests = without(relatedQuests, stats.completedShrineQuests)
  }

  cachedStats = assign(stats, {
    completedShrines: newShrines,
    completedShrineQuests: newQuests,
  })

  await fs.writeFileAsync(statsPath, JSON.stringify(cachedStats, null, 2))

  return readStats()
}

module.exports = {
  readStats,
  setShrineCompletion,
  setShrineQuestCompletion,
}
