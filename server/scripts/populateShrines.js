/* eslint-disable import/no-dynamic-require */

const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const { groupBy, flatten } = require('lodash/fp')

const dataPath = path.resolve(__dirname, '../data')
const shrinesPath = path.resolve(dataPath, 'shrines')

const shrineData = require(shrinesPath)

const newShrineData = flatten(Object.values(groupBy('region', shrineData)))
  .reduce((result, shrine) => {
    result[shrine.id] = shrine
    return result
  }, {})

fs.writeFileAsync(
  `${shrinesPath}--updated.json`, JSON.stringify(newShrineData, null, 2))
