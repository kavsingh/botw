/* eslint-disable import/no-dynamic-require */

const path = require('path')
const { groupBy } = require('lodash/fp')

const dataPath = path.resolve(__dirname, '../data')
const shrinesPath = path.resolve(dataPath, 'shrines')
const shrineData = require(shrinesPath)
const grouped = groupBy('region', shrineData)

Object.entries(grouped).forEach(([key, group]) => {
  console.log(`${key}: ${group.length}`)
})
