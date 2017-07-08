import { isFunction, get, placeholder as _ } from 'lodash/fp'

const botwNamespace = get('botw', window || {}) || {}
const getBotw = get(_, botwNamespace)
const getItems = get('items')

const ifApiFn = (fnName, [valid, invalid]) =>
  (isFunction(getBotw(fnName)) ? valid(botwNamespace) : invalid())

const apiFetch = async (url, params = {}) => {
  try {
    const response = await fetch(`api/${url}`, {
      ...params,
      headers: { accept: 'application/json', ...params.headers || {} },
    })

    const json = await response.json()

    if (response.status >= 400) {
      const error = new Error(json.message || 'Request failed')
      error.status = response.status
      error.message = response.message
      throw error
    }

    return json
  } catch (error) {
    throw error
  }
}

const apiPost = (url, body = {}) =>
  apiFetch(url, {
    body: JSON.stringify(body),
    method: 'post',
    headers: { 'content-type': 'application/json' },
  })

export const fetchStats = () =>
  ifApiFn('getStats', [b => b.getStats(), () => apiFetch('stats')])

export const fetchShrineQuests = () =>
  ifApiFn('getShrineQuests', [
    api => getItems(api.getShrineQuests()),
    () => apiFetch('shrine-quests').then(getItems),
  ])

export const fetchShrines = () =>
  ifApiFn('getShrines', [
    api => getItems(api.getShrines()),
    () => apiFetch('shrines').then(getItems),
  ])

export const saveShrineCompletion = (id, complete) =>
  ifApiFn('completeShrine', [
    api => api.completeShrine(id, complete),
    () => apiPost('stats/shrines/complete', { id, complete }),
  ])

export const saveShrineQuestCompletion = (id, complete) =>
  ifApiFn('completeShrineQuest', [
    api => api.completeShrineQuest(id, complete),
    () => apiPost('stats/shrine-quests/complete', { id, complete }),
  ])
