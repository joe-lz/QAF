import React, { Component } from 'react'
import { AppState, StyleSheet } from 'react-native'
import codePush from "react-native-code-push"

import { connect } from 'react-redux'
import { changeLoading, changeCover } from './app/redux/actions/globalValue'

import { MainScreenNavigator } from './app/index.js'

class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      appState: ''
    }
  }
  componentWillMount () {
  }
  componentDidMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState, 'nextAppState')
    console.log(nextAppState == 'inactive' || nextAppState == 'background', 'truefalse')
    if (nextAppState == 'inactive' || nextAppState == 'background') {
      this.props.dispatchCHANGE_COVER(false)
    } else {
      this.props.dispatchCHANGE_COVER(true)
    }
      this.setState({appState: nextAppState});
  }
  render() {
    return (
      <MainScreenNavigator></MainScreenNavigator>
    )
  }
}

function mapStateToProps (state) {
  return {
    globalValue: state.globalValue
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data)),
    dispatchCHANGE_COVER: (data) => dispatch(changeCover(data)),
  }
}

App = codePush(App)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
