/* eslint-disable import/no-dynamic-require */

const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const { flatMap, get, union, filter, pipe } = require('lodash/fp')

const dataPath = path.resolve(__dirname, '../data')
const statsPath = path.resolve(dataPath, 'stats')
const questsPath = path.resolve(dataPath, 'shrineQuests')

const statsData = require(statsPath)
const questData = require(questsPath)

const { completedShrines, completedShrineQuests } = statsData

const completedFromQuests = pipe(
  filter(({ id }) => completedShrineQuests.includes(id)),
  flatMap(get('shrines')),
)(Object.values(questData))

const newStats = Object.assign(statsData, {
  completedShrines: union(completedShrines, completedFromQuests),
})

fs.writeFileAsync(
  `${statsPath}--updated.json`, JSON.stringify(newStats, null, 2))
