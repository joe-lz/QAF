import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native'

import Item from './Item'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

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
    $api.$fetch('Post', $api.articleNew, {pageSize: 10}).then((res) => {
      if (res.code === 0) {
        this.setState({
          allData: res.data
        })
      }
    }).catch((err) => {
    })
  }
  toDetail (item) {
    this.props.navigation.navigate('DetailArticle', item)
  }
  render() {
    return (
      <sg.Wrapper style={styles.container}>
        <sg.Wrapper style={styles.HWrapper}>
          <sg.H2 style={styles.Htitle}>{strings('titles.new')}</sg.H2>
          <sg.Wrapper style={styles.HRight}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('ArticleNew')
              }}
              underlayColor={'white'}>
              <sg.Pbody style={styles.HRightTitle}>{strings('buttons.loadAll')}</sg.Pbody>
            </TouchableHighlight>
          </sg.Wrapper>
        </sg.Wrapper>
        <sg.Wrapper style={styles.ListWrapper}>
          {
            this.state.allData.map((item) => {
              return <sg.Wrapper key={item._id} style={styles.touchWrapper}>
                <TouchableHighlight
                  onPress={() => this.toDetail(item)}
                  underlayColor={mixin.color.bg_color}>
                  <sg.Wrapper style={styles.ItemWrapper}>
                    <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
                    </Image>
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
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingRight: mixin.padding.nm
  },
  Htitle: {
    flex: 1,
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.nm,
    // paddingBottom: mixin.padding.lg
  },
  HRight: {
    paddingTop: 22,
  },
  HRightTitle: {
    color: mixin.color.primary,
    fontSize: mixin.fs.nm,
    fontWeight: mixin.fw.max
  },
  ListWrapper: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm
  },
  touchWrapper: {
    marginBottom: 10,
  },
  ItemWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imgUrl: {
    width: 40,
    height: 30,
    borderRadius: mixin.radius.sm,
    alignItems: 'stretch',
    backgroundColor: mixin.color.bg_color,
  },
  titleWrapper: {
    flex: 1,
    paddingLeft: 5
  },
  title: {
    lineHeight: 30,
  }
})
