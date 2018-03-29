import React, { Component } from 'react'
import { AppState, Platform, StyleSheet, FlatList, TouchableHighlight, ScrollView, RefreshControl } from 'react-native'
// 广告
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
// 统计
import Config from '../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import GlobalCom from '../components/global'
import Banner from './Banner'
import New from './New'
// import NewList from './NewList'
import SuggestTopic from './Topic'
import AllTopic from './AllTopic'
import UserInfo from './UserInfo'
import Item from './Item'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import { strings } from '../i18n'
export default class _1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }
  componentWillMount () {
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("Home")
    tracker.allowIDFA(true)
  }
  onRefresh () {
    this.setState({
      isRefreshing: true
    }, () => {
      setTimeout(() => {
        this.setState({
          isRefreshing: false
        })
      }, 1000)
    })
  }
  render() {
    return (
      <sg.SafeArea style={styles.safeArea}>
          <sg.OneWrapper>
            <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  tintColor={mixin.fc.gray_sub}
                  title={strings('titles.loading')}
                  titleColor={mixin.fc.gray_sub}
                  colors={['#ff0000', '#00ff00', '#0000ff']}
                  progressBackgroundColor="#ffff00"
                />
              }
              >
              <GlobalCom></GlobalCom>
              <UserInfo navigation={this.props.navigation}></UserInfo>
              <Banner navigation={this.props.navigation} refreshing={this.state.isRefreshing}></Banner>
              <New navigation={this.props.navigation} refreshing={this.state.isRefreshing}></New>
              {/* <sg.Wrapper style={{...mixin.AdWrapper}}>
                <sg.Wrapper style={{...mixin.AdWrapperContent}}>
                  <AdMobBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-6546234661958235/3852957982"
                    testDevices={[AdMobBanner.simulatorId]}
                    // onAdFailedToLoad={error => console.error(error)}
                  />
                </sg.Wrapper>
              </sg.Wrapper> */}
              <SuggestTopic navigation={this.props.navigation} refreshing={this.state.isRefreshing}></SuggestTopic>
              <AllTopic navigation={this.props.navigation} refreshing={this.state.isRefreshing}></AllTopic>
              {/* <Topic navigation={this.props.navigation} refreshing={this.state.isRefreshing}></Topic> */}

            </ScrollView>
          </sg.OneWrapper>
      </sg.SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  H1Wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingRight: mixin.padding.nm
  },
  H1title: {
    flex: 1,
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.lg
  },
  H1Right: {
    paddingTop: 20,
  },
  H1RightTitle: {
    color: mixin.fc.gray,
    fontSize: mixin.fs.nm,
    fontWeight: mixin.fw.max
  }
})
