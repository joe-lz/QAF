import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, ScrollView, Image, FlatList, Button } from 'react-native'
// 统计
import Config from '../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import IconCom from '../components/icon'

import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import $api from '../_api'
import Item from './Item'

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../redux/actions/userinfo'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { strings } from '../i18n'
class _2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userinfo: {
      },
      refreshing: false,
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }
  }
  componentWillMount () {
    console.log(Date.now())
    this.getPostData()
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("Topic")
  }
  onRefresh () {
    this.setState({
      refreshing: true,
      allData: [],
      nextPageNo: 1
    }, () => {
      this.getPostData()
    })
  }
  getPostData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.userpostNew,
        this.state.allData,
        this.state.nextPageNo).then((res) => {
        this.setState({
          allData: res.allData,
          nextPageNo: res.nextPageNo,
          onEndReachedCalledDuringMomentum: true
        }, () => {
          console.log(this.state)
        })
        this.setState({
          refreshing: false
        })
      })
    }
  }
  jump2Post () {
    $api.SignRequired().then((res) => {
      this.props.navigation.navigate('AccountProfile', {
        userId: this.props.userinfo._id
      })
    }).catch((err) => {
      this.props.navigation.navigate('Sign')
    })
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListHeaderComponent = null
    // let ListHeaderComponent = <sg.Wrapper style={styles.SendImageComWrapper}>
    //   <TouchableHighlight
    //     onPress={() => {
    //       this.jump2Post()
    //     }}
    //     underlayColor={'transparent'}>
    //     <sg.Wrapper style={styles.SendImageCom}>
    //       <sg.Wrapper style={styles.SendImageIconWrapper}>
    //         <IconCom
    //           type='MD'
    //           name='share'
    //           size={mixin.icon.mini}
    //           color={'white'}></IconCom>
    //         </sg.Wrapper>
    //         <sg.Pcaption style={styles.SendImageTitle}>{strings('buttons.sendImage')}</sg.Pcaption>
    //     </sg.Wrapper>
    //   </TouchableHighlight>
    // </sg.Wrapper>
    let Camera = null
    // if (Math.floor(Date.now() / 1000) > 1521302400) {
    // }
    Camera = <TouchableHighlight
      style={styles.postIcon}
      onPress={() => {
        this.jump2Post()
      }}
      underlayColor={'transparent'}>
      <IconCom
        // type='MD'
        name='camera'
        size={mixin.icon.sm}
        color={mixin.fc.gray}
        >
      </IconCom>
    </TouchableHighlight>
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper style={styles.OneWrapper}>
          {ListHeaderComponent}
          <sg.Wrapper style={styles.tabHeaderWrapper}>
            <sg.H1 style={styles.tabHeader}>{strings('tabs.posts')}</sg.H1>
            {Camera}
          </sg.Wrapper>
          <FlatList
            style={styles.FlatList}
            contentContainerStyle={styles.FlatList}
            onRefresh={() => {
              this.onRefresh()
            }}
            refreshing={this.state.refreshing}
            // ListHeaderComponent={ListHeaderComponent}
            // ListFooterComponent={ListFooterComponent}
            // ListEmptyComponent={
            //   <sg.Wrapper style={styles.ListEmptyComponent}>
            //     <sg.Pcaption style={styles.ListEmptyComponentTitle}>{strings('titles.noData')}</sg.Pcaption>
            //   </sg.Wrapper>
            // }
            onEndReachedThreshold={0.5}
            onEndReached={(info) => {
              if (!this.state.onEndReachedCalledDuringMomentum) {
                this.getPostData()
              }
            }}
            onMomentumScrollBegin={() => {
              this.setState({
                onEndReachedCalledDuringMomentum: false
              })}
            }
            data={this.state.allData}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => {
              return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
          }}/>
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
)(_2)

const styles = StyleSheet.create({
  OneWrapper: {
  },
  tabHeaderWrapper: {
    position: 'relative',
    // display: 'flex',
    // flexWrap: 'nowrap',
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    padding: mixin.padding.nm,
    paddingBottom: mixin.padding.lg,
    paddingTop: mixin.padding.lg,
  },
  tabHeader: {
    // flex: 1,
  },
  postIcon: {
    position: 'absolute',
    right: 0,
    bottom: 20
  },
  FlatList: {
    // paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.max
  },
})
