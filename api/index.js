const Promise = require('bluebird')
const {
  assign,
  without,
  union,
  sortBy,
  find,
  get,
  eq,
  pipe,
} = require('lodash/fp')
const fetch = require('node-fetch')
const apiConfig = require('../.apiconfig.js')

const cache = {
  shrineQuests: null,
  shrines: null,
  stats: null,
}

const jsonFetch = async (url, params = {}) => {
  try {
    const response = await fetch(
      url,
      assign({ headers: { accept: 'application/json' } }, params),
    )
    const json = await response.json()

    return json
  } catch (error) {
    throw error
  }
}

const jsonUpdate = async (url, data) =>
  jsonFetch(url, {
    body: JSON.stringify(data),
    method: 'put',
    headers: { 'content-type': 'application/json' },
  })

const getStats = async () => {
  if (!cache.stats) {
    cache.stats = await jsonFetch(apiConfig.statsUrl)
  }

  return cache.stats
}

const getShrines = async () => {
  if (cache.shrines) return cache.shrines

  const json = await jsonFetch(apiConfig.shrinesUrl)
  cache.shrines = sortBy(({ id }) => id, Object.values(json))

  return cache.shrines
}

const getShrineQuests = async () => {
  if (cache.shrineQuests) return cache.shrineQuests

  const json = await jsonFetch(apiConfig.shrineQuestsUrl)
  cache.shrineQuests = Object.values(json).sort((a, b) => a.order - b.order)

  return cache.shrineQuests
}

const setShrineQuestCompletion = async (id, complete) => {
  const [stats, shrineQuests] = await Promise.all([
    getStats(),
    getShrineQuests(),
  ])
  const idx = stats.completedShrineQuests.indexOf(id)

  if ((complete && idx !== -1) || (!complete && idx === -1)) return stats

  const relatedShrines =
    get('shrines', find(pipe(get('id'), eq(id)), shrineQuests)) || []

  let newQuests
  let newShrines

  if (complete) {
    newQuests = union(stats.completedShrineQuests, [id])
    newShrines = union(stats.completedShrines, relatedShrines)
  } else {
    newQuests = without([id], stats.completedShrineQuests)
    newShrines = without(relatedShrines, stats.completedShrines)
  }

  try {
    const response = await jsonUpdate(apiConfig.statsUrl, {
      completedShrines: newShrines,
      completedShrineQuests: newQuests,
    })

    cache.stats = assign(cache.stats, response)

    return cache.stats
  } catch (error) {
    console.log(error)
    return []
  }
}

const setShrineCompletion = async (id, complete) => {
  const [stats, shrines] = await Promise.all([getStats(), getShrines()])
  const idx = stats.completedShrines.indexOf(id)

  if ((complete && idx !== -1) || (!complete && idx === -1)) return stats

  const relatedQuests =
    get('shrineQuests', find(pipe(get('id'), eq(id)), shrines)) || []

  let newShrines
  let newQuests

  if (complete) {
    newShrines = union(stats.completedShrines, [id])
    newQuests = union(stats.completedShrineQuests, relatedQuests)
  } else {
    newShrines = without([id], stats.completedShrines)
    newQuests = without(relatedQuests, stats.completedShrineQuests)
  }

  try {
    const response = await jsonUpdate(apiConfig.statsUrl, {
      completedShrines: newShrines,
      completedShrineQuests: newQuests,
    })

    cache.stats = assign(cache.stats, response)

    return cache.stats
  } catch (error) {
    console.log(error)
    return []
  }
}

module.exports = {
  getStats,
  getShrines,
  getShrineQuests,
  setShrineCompletion,
  setShrineQuestCompletion,
}
