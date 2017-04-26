import { get, pipe } from 'lodash/fp'

const rootSelect = get('stats')

export const getCompletedShrineIds =
  pipe(rootSelect, get('completedShrines'))

export const getCompletedShrineQuestIds =
  pipe(rootSelect, get('completedShrineQuests'))
