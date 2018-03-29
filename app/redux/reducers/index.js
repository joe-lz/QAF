import { combineReducers } from 'redux'
import counter from './counter'
import userinfo from './userinfo'
import globalValue from './globalValue'

const qafApp = combineReducers({
  counter,
  userinfo,
  globalValue
})

export default qafApp
