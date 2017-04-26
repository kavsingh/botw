import { filter, negate } from 'lodash/fp'

export const isComplete = item => !!item.complete

export const getComplete = filter(isComplete)

export const getIncomplete = filter(negate(isComplete))
