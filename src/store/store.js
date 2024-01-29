import { createStore, combineReducers } from 'redux'
import tabReducer from './tab/reducers'

const rootReducer = combineReducers({
  tab: tabReducer
})

const store = createStore(rootReducer);

export default store;