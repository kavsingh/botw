import { get, pipe } from 'lodash/fp'

const rootSelect = get('stats')

export const getCompletedShrineQuestIds =
  pipe(rootSelect, get('completedShrineQuests'))
