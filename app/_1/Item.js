import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, Image, Text } from 'react-native'

import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import api from '../_api'

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
  toDetail (item) {
    this.props.navigation.navigate('DetailArticle', item)
  }
  render() {
    const item = this.props.item
    return (
      <sg.Wrapper style={styles.containerWrapper}>
        <sg.Wrapper style={styles.container}>
          <TouchableHighlight
            onPress={() => this.toDetail(item)}
            underlayColor={mixin.color.bg_color}>
            <sg.Wrapper style={styles.ContentContainer}>
              <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
              </Image>
              {/* <sg.Wrapper style={styles.maskWrapper}> */}
              {/* </sg.Wrapper> */}
              <sg.Wrapper style={styles.titleWrapper}>
                <sg.Pbody style={styles.title} numberOfLines={2}>{item.title}</sg.Pbody>
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
  },
  container: {
    overflow: 'hidden'
  },
  ContentContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imgUrl: {
    width: 120,
    height: 67,
    alignItems: 'stretch',
    backgroundColor: mixin.color.bg_color,
    borderRadius: mixin.radius.nm
  },
  titleWrapper: {
    flex: 1,
    paddingLeft: mixin.padding.sm,
    paddingRight: mixin.padding.sm,
    width: '100%'
  },
  title: {
    lineHeight: 20,
    fontWeight: mixin.fw.max
  }
})
