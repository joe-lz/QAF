import React, { Component } from 'react'
import { Platform, StyleSheet, FlatList } from 'react-native'

import Item from './Item'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

export default class NewList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allData: [],
      nextPageNo: 1
    }
  }
  componentWillMount () {
    this.getData()
  }
  getData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.articleNew, this.state.allData, this.state.nextPageNo).then((res) => {
        console.log(res)
        this.setState({
          allData: res.allData,
          nextPageNo: res.nextPageNo
        })
      })
    }
  }
  render() {
    return (
      <sg.Wrapper style={styles.container}>
        <sg.H1 style={styles.title}>最新</sg.H1>
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={(info) => {
            this.getData()
          }}
          data={this.state.allData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
        }}/>
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.lg
  }
})
