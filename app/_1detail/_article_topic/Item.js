import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, Image, Text } from 'react-native'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import api from '../../_api'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250 // 9:6
const H169 = x <= 375 ?  180: 220 // 16:9

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  // toDetail (item) {
  //   this.props.navigation.navigate('DetailArticle', item)
  // }
  render() {
    const item = this.props.item
    return (
      <sg.Wrapper style={styles.containerWrapper}>
        <sg.Wrapper style={styles.container}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('ArticleTopicDetail', item)
            }}
            underlayColor={mixin.color.bg_color}>
            <sg.Wrapper>
              <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
              </Image>
              <sg.Wrapper style={styles.maskWrapper}>
              </sg.Wrapper>
              <sg.Wrapper style={styles.titleWrapper}>
                <sg.Pbody style={styles.title}>{item.title}</sg.Pbody>
              </sg.Wrapper>
            </sg.Wrapper>
          </TouchableHighlight>
        </sg.Wrapper>
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  containerWrapper: {
    marginLeft: mixin.padding.nm,
    marginRight: mixin.padding.nm,
    marginBottom: mixin.padding.nm,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: mixin.radius.nm,
    shadowOpacity: 1
  },
  container: {
    borderRadius: mixin.radius.nm,
    overflow: 'hidden'
  },
  imgUrl: {
    height: H169,
    alignItems: 'stretch',
    backgroundColor: mixin.color.bg_color,
  },
  maskWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    padding: mixin.padding.nm,
    paddingLeft: mixin.padding.sm,
    paddingRight: mixin.padding.sm,
    width: '100%'
  },
  title: {
    lineHeight: 24,
    fontWeight: mixin.fw.max,
    color: 'white',
  }
})
