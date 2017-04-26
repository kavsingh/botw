import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { reducers as shrineReducers } from './shrine'
import { reducers as shrineQuestReducers } from './shrineQuest'
import { reducers as statsReducers } from './stats'

const loggerMiddleware = createLogger({ collapsed: true })
const history = createHistory()

const middleWares = [
  routerMiddleware(history),
  thunkMiddleware,
  loggerMiddleware,
]

const createStoreWithMiddleware =
  compose(applyMiddleware(...middleWares))(createStore)

const rootReducer = {
  router: routerReducer,
  ...statsReducers,
  ...shrineReducers,
  ...shrineQuestReducers,
}

export const configureStore = (initialState = {}) => ({
  history,
  store: createStoreWithMiddleware(combineReducers(rootReducer), initialState),
})
