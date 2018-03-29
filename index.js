import { AppRegistry } from 'react-native'
import App from './App'

import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './app/redux/reducers'

const loggerMiddleware = createLogger()
let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const appClient = () => {
  return <Provider store={store}>
    <App/>
  </Provider>
}

AppRegistry.registerComponent('appClient', () => appClient)
