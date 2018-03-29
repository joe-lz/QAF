import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, Image, Text } from 'react-native'

import Config from '../_config'
import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import $api from '../_api'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250 // 9:6
const H169 = x <= 375 ?  180: 220 // 16:9

import { strings } from '../i18n'
export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  toDetail (item) {
    this.props.navigation.navigate('DetailArticle', item)
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    const item = this.props.item
    let itemContent = null
    if (item.content) {
      itemContent = <sg.Pbody style={styles.itemContent}>{item.content}</sg.Pbody>
    }
    return (
      <sg.Wrapper style={styles.itemWrapper}>
        <TouchableHighlight
          onPress={() => navigate('AccountProfile', {userId: item.userId._id})}
          underlayColor={'transparent'}>
          <sg.Wrapper style={styles.itemTopWrapper}>
            <sg.Wrapper style={styles.itemTopLeftWrapper}>
              <Image source={{uri: `${Config.qiniu.root}${item.userId.avatar}`}}
              style={styles.itemAvatar}>
              </Image>
              <sg.Pbody style={styles.itemUsername}>{$api.YesOrNot(item.userId.username, strings('titles.stranger'))}</sg.Pbody>
            </sg.Wrapper>
            {/* <sg.Pbody style={styles.itemTime}>{item.createdAt}</sg.Pbody> */}
          </sg.Wrapper>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('UserPostDetail', item)
          }}
          underlayColor={'transparent'}>
          <sg.Wrapper style={styles.itemContentWrapper}>
            <sg.Wrapper style={styles.itemImageWrapper}>
              <Image source={{uri: `${Config.qiniu.root}${item.img}`}}
              style={styles.itemImage}>
              </Image>
            </sg.Wrapper>
            {itemContent}
          </sg.Wrapper>
        </TouchableHighlight>
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingBottom: mixin.padding.lg
  },
  itemTopWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: mixin.padding.nm,
    paddingTop: 0,
    paddingBottom: 10
  },
  itemTopLeftWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  itemUsername: {
    flex: 1,
    paddingLeft: 10,
    lineHeight: 30,
    fontWeight:  mixin.fw.max
  },
  itemAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: mixin.color.bg_color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  itemTime: {
    lineHeight: 30,
    color: mixin.fc.gray
  },
  itemImageWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  itemImage: {
    width: x,
    height: x,
    backgroundColor: mixin.color.bg_color
  },
  itemContent: {
    padding: mixin.padding.nm,
    paddingBottom: 0,
    lineHeight: 20
  },
})
