import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import api from '../_api'

import { connect } from 'react-redux'
import {handleIncrease, handleDecrease} from '../redux/actions/counter'

import ButtonCom from '../components/button'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  handleIncrease = (data) => {
    this.props.dispatchIncrease(data)
  }
  handleDecrease (data) {
    this.props.dispatchDecrease(data)
  }
  render() {
    return (
      <sg.Wrapper style={styles.container}>
        <sg.H1 style={styles.type}>Counter</sg.H1>
        <sg.H3>{this.props.counter}</sg.H3>
        <ButtonCom
          style={styles.btnSubmit}
          onPress={this.handleIncrease.bind(this)}
          isClick={true}
          title='+'></ButtonCom>
        <ButtonCom
          style={styles.btnSubmit}
          onPress={this.handleDecrease.bind(this)}
          isClick={true}
          title='-'></ButtonCom>
      </sg.Wrapper>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm
  }
})
function mapStateToProps (state) {
  return {
    counter: state.counter
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchIncrease: (counter) => dispatch(handleINCREASE(counter)),
    dispatchDecrease: (counter) => dispatch(handleDECREASE(counter))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter)
