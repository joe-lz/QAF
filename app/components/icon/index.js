import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';

import sg from '../../styleguide'

import mixin from '../../styleguide/mixin'
import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class IconCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
  }
  onPress () {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }
  render() {
    let IconCom = null
    let iconWidth = this.props.width ? this.props.width : 44
    let iconAlign = this.props.align ? this.props.align : 'center'
    let IconWrapper = null
    if (this.props.type === 'MD') {
      IconWrapper = <MaterialCommunityIcons
        name={this.props.name ? this.props.name : 'angle-left'}
        size={this.props.size ? this.props.size : mixin.icon.nm}
        color={this.props.color ? this.props.color : mixin.fc.main}
        style={{
          width: iconWidth,
          lineHeight: 44,
          textAlign: iconAlign
        }}
        >
      </MaterialCommunityIcons>
    } else {
      IconWrapper = <Icon
        name={this.props.name ? this.props.name : 'angle-left'}
        size={this.props.size ? this.props.size : mixin.icon.nm}
        color={this.props.color ? this.props.color : mixin.fc.main}
        style={{
          width: iconWidth,
          lineHeight: 44,
          textAlign: iconAlign
        }}
        >
      </Icon>
    }

    if (this.props.onPress) {
      IconCom = <TouchableHighlight
        style={styles.container}
        onPress={() => this.onPress()}
        underlayColor={'transparent'}>
        <View style={styles.IconWrapper}>
          {IconWrapper}
        </View>
      </TouchableHighlight>
    } else {
      IconCom = <View style={styles.IconWrapper}>
        {IconWrapper}
        {/* <Icon
          name={this.props.name ? this.props.name : 'angle-left'}
          size={this.props.size ? this.props.size : mixin.icon.nm}
          color={this.props.color ? this.props.color : mixin.fc.main}
          style={{
            width: iconWidth,
            lineHeight: 44,
            textAlign: iconAlign
          }}
          >
        </Icon> */}
      </View>
    }
    return (
      <View>{IconCom}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  IconWrapper: {
    flex: 1,
    height: 44,
  },
  Icon: {
    // width: 44,
    // lineHeight: 44,
    // textAlign: 'center'
  }
})
