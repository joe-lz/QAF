import React, { Component } from 'react'
import { AppState, Platform, StyleSheet, FlatList, TouchableHighlight, ScrollView, RefreshControl } from 'react-native'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import GlobalCom from '../components/global'
import Banner from './Banner'
import New from './New'
import Topic from './Topic'
// import NewList from './NewList'
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
      $api.GetList($api.articleNew, this.state.allData, this.state.nextPageNo).then((res) => {
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
    let ListHeaderComponent = <sg.Wrapper>
      <GlobalCom></GlobalCom>
      <UserInfo navigation={this.props.navigation}></UserInfo>
      <Banner navigation={this.props.navigation} refreshing={this.state.refreshing}></Banner>
      <sg.Wrapper style={styles.H1Wrapper}>
        <sg.H1 style={styles.H1title}>{strings('titles.new')}</sg.H1>
        <sg.Wrapper style={styles.H1Right}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('ArticleTopic')
            }}
            underlayColor={'white'}>
            <sg.Pbody style={styles.H1RightTitle}>{strings('buttons.topiclist')}</sg.Pbody>
          </TouchableHighlight>
        </sg.Wrapper>
      </sg.Wrapper>
    </sg.Wrapper>
    return (
      <sg.SafeArea style={styles.safeArea}>
          <sg.OneWrapper>
            <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  tintColor="#ff0000"
                  title="Loading..."
                  titleColor="#00ff00"
                  colors={['#ff0000', '#00ff00', '#0000ff']}
                  progressBackgroundColor="#ffff00"
                />
              }>
              >
              {/* <FlatList
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
                data={this.state.allData}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                  return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
              }}/> */}
              <GlobalCom></GlobalCom>
              <UserInfo navigation={this.props.navigation}></UserInfo>
              <Banner navigation={this.props.navigation} refreshing={this.state.refreshing}></Banner>
              <New navigation={this.props.navigation} refreshing={this.state.refreshing}></New>
              {/* <sg.Wrapper style={{...mixin.AdWrapper}}>
                <sg.Wrapper style={{...mixin.AdWrapperContent}}>
                  <AdMobBanner
                    adSize="banner"
                    adUnitID="ca-app-pub-6546234661958235/7558584498"
                    testDevices={[AdMobBanner.simulatorId]}
                    // onAdFailedToLoad={error => console.error(error)}
                  />
                </sg.Wrapper>
              </sg.Wrapper> */}
              <Topic navigation={this.props.navigation} refreshing={this.state.refreshing}></Topic>
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
