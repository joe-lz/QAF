import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';

import IconCom from '../icon'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

export default class HeaderCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
  }
  // 接收到prop变化
  componentWillReceiveProps (nextProps) {
    this.setState({
    })
  }
  render() {
    // icon
    // onIconPress
    // title
    // btnTitle
    // btnIconName
    // onPress
    // navigation
    const {navigate, goBack, state} = this.props.navigation
    let HeaderMiddleCom = null
    if (this.props.title) {
      HeaderMiddleCom = <sg.Wrapper style={{...mixin.HeaderMiddleCom}}>
        <sg.H3 numberOfLines={1} style={{...mixin.HeaderMiddleTitle}}>{this.props.title}</sg.H3>
      </sg.Wrapper>
    }
    let HeaderRightComButton= null
    if (this.props.btnTitle) {
      HeaderRightComButton = <sg.Wrapper style={{...mixin.HeaderRightComButton}}>
        <Button onPress={() => this.props.onPress()} title={this.props.btnTitle} color={mixin.color.primary} accessibilityLabel="save"/>
      </sg.Wrapper>
    } else if (this.props.btnIconName) {
      HeaderRightComButton = <sg.Wrapper style={{...mixin.HeaderRightCom}}>
        <IconCom
          name={this.props.btnIconName}
          size={mixin.icon.sm}
          onPress={() => this.props.onPress()}></IconCom>
      </sg.Wrapper>
    }
    let leftIconName = 'angle-left'
    if (this.props.icon) {
      leftIconName = this.props.icon
    }
    let leftIcon = null
    if (this.props.iconType) {
      leftIcon = <IconCom
        type={this.props.iconType}
        name={leftIconName}
        onPress={() => this.props.onIconPress()}></IconCom>
    } else {
      leftIcon = <IconCom name={leftIconName} onPress={this.props.navigation.goBack.bind(this)}></IconCom>
    }
    return (
      <sg.Wrapper style={{...mixin.HeaderWrapper}}>
        <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
          {leftIcon}
        </sg.Wrapper>
        {HeaderMiddleCom}
        {HeaderRightComButton}
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  // TouchableHighlight: {
  //   padding: 15,
  //   backgroundColor: mixin.fc.main,
  //   borderRadius: 4
  // }
})
