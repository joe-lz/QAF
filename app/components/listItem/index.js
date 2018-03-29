import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableHighlight, Image } from 'react-native';

import IconCom from '../icon'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import $api from '../../_api'
import Config from '../../_config'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

export default class ListItemCom extends Component {
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
    // 右箭头
    let menuRightIcon = null
    if (this.props.onPress) {
      menuRightIcon = <sg.Wrapper style={styles.menuItemRightIcon}>
        <IconCom
          name='angle-right'
          size={mixin.icon.sm}
          color={mixin.fc.gray_sub}
          width={15}
          align='right'
          ></IconCom>
      </sg.Wrapper>
    }
    // 左组件
    let menuItemLeftClassName = [styles.menuItemLeft]
    if (this.props.rightImage) {
      // 如果类型是图片
      menuItemLeftClassName = [styles.menuItemLeft, styles.menuItemLeftImg]
    }
    let menuItemLeft = <sg.Wrapper style={menuItemLeftClassName}>
      <sg.Pbody style={styles.menuItemLeftTitle}>{this.props.leftTitle}</sg.Pbody>
    </sg.Wrapper>
    // 右组件
    let menuItemRight = <sg.Wrapper style={styles.menuItemRight}>
      <sg.Pbody numberOfLines={1} style={styles.menuItemRightTitle}>{this.props.rightTitle}</sg.Pbody>
      {menuRightIcon}
    </sg.Wrapper>
    if (this.props.rightImage) {
      // 如果类型是图片
      menuItemRight = <sg.Wrapper style={[styles.menuItemRight, styles.menuItemRightImg]}>
        <Image source={{uri: `${Config.qiniu.root}${this.props.rightImage}`}}
        style={styles.imgUrl}>
        </Image>
        {menuRightIcon}
      </sg.Wrapper>
    }
    // 组件All
    let ListItemComItem = <sg.Wrapper style={styles.menuItemWrapper}>
      {menuItemLeft}
      {menuItemRight}
    </sg.Wrapper>
    // 是否可点击
    let ListItemCom = null
    if (this.props.onPress) {
      ListItemCom = <TouchableHighlight
        style={styles.container}
        onPress={() => this.onPress()}
        underlayColor={mixin.color.bg_color}>
        {ListItemComItem}
      </TouchableHighlight>
    } else {
      ListItemCom = <sg.Wrapper style={styles.IconWrapper}>
        {ListItemComItem}
      </sg.Wrapper>
    }
    return (
      <sg.Wrapper>{ListItemCom}</sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  menuItemWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    // height: 84,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
    overflow: 'hidden'
  },
  menuItemLeft: {
  },
  menuItemLeftTitle: {
    lineHeight: mixin.padding.max
  },
  menuItemRight: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    // paddingLeft: mixin.padding.nm,
    paddingLeft: 100
  },
  menuItemRightTitle: {
    flex: 1,
    fontSize: mixin.fs.sm,
    lineHeight: mixin.padding.max,
    textAlign: 'right',
    color: mixin.fc.gray
  },
  menuItemRightIcon: {
    paddingTop: 8
  },
  // 图片样式
  menuItemLeftImg: {
    flex: 1
  },
  imgUrl: {
    marginTop: 15,
    width: 30,
    height: 30
  },
  menuItemRightImg: {
    flex: 0
  }
})
