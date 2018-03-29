import React, { Component } from 'react'
import { AppState, Platform, StyleSheet, ScrollView, TouchableHighlight, Alert, FlatList, Image } from 'react-native'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import IconCom from '../../components/icon'
import HeaderCom from '../../components/header'
import Item from './Item'

import mixin from '../../styleguide/mixin'
import sg from '../../styleguide'
import $api from '../../_api'

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250 // 9:6
const H169 = x <= 375 ?  180: 220 // 16:9


import { strings } from '../../i18n'
class ArticleTopic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }
  }
  componentWillMount () {
    this.getData()
  }
  onRefresh () {
    this.setState({
      refreshing: true,
      allData: [],
      nextPageNo: 1
    }, () => {
      this.getData()
    })
  }
  getData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.articleTopicList, this.state.allData, this.state.nextPageNo).then((res) => {
        this.setState({
          allData: res.allData,
          nextPageNo: res.nextPageNo,
          onEndReachedCalledDuringMomentum: true
        })
        this.setState({
          refreshing: false
        })
      })
    }
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListHeaderComponent = null
    ListHeaderComponent = <sg.Wrapper style={{...mixin.AdWrapper}}>
      <sg.Wrapper style={{...mixin.AdWrapperContent}}>
        <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-6546234661958235/2163142802"
          testDevices={[AdMobBanner.simulatorId]}
          // onAdFailedToLoad={error => console.error(error)}
        />
      </sg.Wrapper>
    </sg.Wrapper>

    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={strings('buttons.topiclist')}
            navigation={this.props.navigation}>
          </HeaderCom>
          <sg.Wrapper style={{...mixin.bodyWrapper}}>
            <FlatList
              style={styles.FlatList}
              onRefresh={() => {
                this.onRefresh()
              }}
              refreshing={this.state.refreshing}
              ListHeaderComponent={ListHeaderComponent}
              onEndReachedThreshold={0.5}
              onEndReached={(info) => {
                if (!this.state.onEndReachedCalledDuringMomentum) {
                  this.getData()
                }
              }}
              onMomentumScrollBegin={() => {
                this.setState({
                  onEndReachedCalledDuringMomentum: false
                })}
              }
              ListFooterComponent={<sg.Wrapper>
                <sg.Pbody style={{...mixin.Footer}}>{strings('titles.noMore')}</sg.Pbody>
              </sg.Wrapper>}
              data={this.state.allData}
              keyExtractor={item => item._id}
              renderItem={({item}) => {
                return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
            }}/>
          </sg.Wrapper>
        </sg.OneWrapper>
      </sg.SafeArea>
    )
  }
}
function mapStateToProps (state) {
  return {
    userinfo: state.userinfo
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchGET_USERINFO: () => dispatch(handleGET_USERINFO()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleTopic)

const styles = StyleSheet.create({
  FlatList: {
    paddingTop: mixin.padding.nm
  }
})
