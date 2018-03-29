import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';

import sg from '../../styleguide'

import mixin from '../../styleguide/mixin'
import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

export default class ButtonCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isClick: false
    }
  }
  componentDidMount () {
  }
  // 接收到prop变化
  componentWillReceiveProps (nextProps) {
    this.setState({
      isClick: nextProps.isClick
    })
  }
  render() {
    let ButtonGroup = null
    if (this.state.isClick) {
      ButtonGroup = <TouchableHighlight
        style={styles.TouchableHighlight}
        onPress={() => this.props.onPress()}
        underlayColor={ mixin.fc.secondary }>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableHighlight>
    } else {
      ButtonGroup = <sg.ButtonDisabled style={styles.ButtonDisabled}>
        <Text style={styles.ButtonDisabledText}>{this.props.title}</Text>
      </sg.ButtonDisabled>
    }
    return (
      <View>{ButtonGroup}</View>
    )
  }
}

const styles = StyleSheet.create({
  TouchableHighlight: {
    padding: 15,
    backgroundColor: mixin.fc.main,
    borderRadius: 4
  },
  text: {
    textAlign: 'center',
    fontSize: mixin.fs.nm,
    color: mixin.fc.light
  },
  ButtonDisabled: {
  },
  ButtonDisabledText: {
    textAlign: 'center',
    color: mixin.fc.gray_sub
  }
})
