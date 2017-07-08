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

export const fetchStats = () => apiFetch('stats')

export const fetchShrineQuests = () =>
  apiFetch('shrine-quests').then(({ items }) => items)

export const fetchShrines = () => apiFetch('shrines').then(({ items }) => items)

export const saveShrineCompletion = (id, complete) =>
  apiPost('stats/shrines/complete', { id, complete })

export const saveShrineQuestCompletion = (id, complete) =>
  apiPost('stats/shrine-quests/complete', { id, complete })
