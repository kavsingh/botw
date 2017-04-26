/* eslint-disable import/no-dynamic-require */

const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const { has } = require('lodash/fp')

const dataPath = path.resolve(__dirname, '../data')
const shrinesPath = path.resolve(dataPath, 'shrines')
const questsPath = path.resolve(dataPath, 'shrineQuests')

const shrineData = require(shrinesPath)
const questData = require(questsPath)

const newShrines = Object.values(shrineData)
  .map(shrine => {
    const hasAttr = has(has.placeholder, shrine)
    return Object.assign(shrine, {
      type: hasAttr('type') ? shrine.type : '',
      shrineQuests: hasAttr('shrineQuests') ? shrine.shrineQuests : [],
    })
  })
  .reduce((shrines, shrine) =>
    Object.assign(shrines, { [shrine.id]: shrine }), {})

const questShrines = Object.values(questData)
  .map(({ id, shrines }) => shrines.reduce((o, shrine) => ({
    id: shrine,
    shrineQuest: id,
  }), {}))

questShrines.forEach(({ id, shrineQuest }) => {
  const shrine = newShrines[id]

  if (!shrine) {
    newShrines[id] = {
      id,
      name: '',
      region: '',
      type: '',
      location: '',
      shrineQuests: [shrineQuest],
    }
  } else if (!(shrine.shrineQuests || []).includes(shrineQuest)) {
    shrine.shrineQuests = [shrineQuest]
  }
})

fs.writeFileAsync(
  `${shrinesPath}--updated.json`, JSON.stringify(newShrines, null, 2))
