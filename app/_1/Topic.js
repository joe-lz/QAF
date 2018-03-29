import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const W = (x - 15 * 2 - 6) / 2

import { strings } from '../i18n'
export default class New extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allData: []
    }
  }
  componentWillMount () {
    this.getData()
  }
  // 接收到prop变化
  componentWillReceiveProps () {
    let refreshing = this.props.refreshing
    if (refreshing) {
      this.setState({
        allData: []
      }, () => {
        this.getData()
      })
    }
  }
  getData () {
    $api.$fetch('Post', $api.articleTopicSuggest, {pageSize: 10}).then((res) => {
      if (res.code === 0) {
        this.setState({
          allData: res.data
        })
      }
    }).catch((err) => {
    })
  }
  render() {
    return (
      <sg.Wrapper style={styles.container}>
        <sg.Wrapper style={styles.HWrapper}>
          <sg.H2 style={styles.Htitle}>{strings('titles.suggestTopic')}</sg.H2>
        </sg.Wrapper>
        <sg.Wrapper style={styles.ListWrapper}>
          {
            this.state.allData.map((item) => {
              return <sg.Wrapper key={item._id} style={styles.touchWrapper}>
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate('ArticleTopicDetail', item)}
                  underlayColor={mixin.color.bg_color}>
                  <sg.Wrapper style={styles.ItemWrapper}>
                    <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
                    </Image>
                    <sg.Wrapper style={styles.maskWrapper}>
                    </sg.Wrapper>
                    <sg.Wrapper style={styles.titleWrapper}>
                      <sg.Pbody style={styles.title} numberOfLines={1}>{item.title}</sg.Pbody>
                    </sg.Wrapper>
                  </sg.Wrapper>
                </TouchableHighlight>
              </sg.Wrapper>
            })
          }
        </sg.Wrapper>
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  HWrapper: {
  },
  Htitle: {
    padding: mixin.padding.nm,
    paddingBottom: mixin.padding.sm,
    paddingTop: 20,
  },
  ListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: mixin.padding.nm,
    paddingTop: 0
  },
  touchWrapper: {
    marginTop: 6,
    width: W,
    height: 80,
  },
  ItemWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  imgUrl: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: mixin.color.bg_color,
    borderRadius: mixin.radius.nm
  },
  maskWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    borderRadius: mixin.radius.nm
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: mixin.fw.max,
    fontSize: mixin.fs.lg,
  }
})
