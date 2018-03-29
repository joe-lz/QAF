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

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../redux/actions/userinfo'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { strings } from '../i18n'
class _3 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSign: false,
      userinfo: {
      },
      refreshing: false,
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }
  }
  componentWillMount () {
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("Message")

    $api.isSign().then((res) => {
      if (res) {
        this.setState({
          isSign: true
        })
        this.getAllData()
      } else {
        this.setState({
          isSign: false
        })
      }
    })
  }
  onRefresh () {
    this.setState({
      refreshing: true,
      allData: [],
      nextPageNo: 1
    }, () => {
      if (this.state.isSign) {
        this.getAllData()
      }
    })
  }
  getAllData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.commentToMe,
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
  jump2 (item) {
    const {navigate, goBack, state} = this.props.navigation
    if (item.articleId) {
      navigate('DetailArticle', item.articleId)
    } else if (item.userpostId) {
      navigate('UserPostDetail', item.userpostId)
    }
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListEmptyComponent = null
    if (this.state.isSign) {
      ListEmptyComponent = <sg.Wrapper style={styles.ListEmptyComponent}>
        <sg.Pcaption style={{...mixin.ListEmptyComponentTitle}}>{strings('titles.noData')}</sg.Pcaption>
      </sg.Wrapper>
    } else {
      ListEmptyComponent = <sg.Wrapper style={styles.ListEmptyComponent}>
        <TouchableHighlight
          onPress={() => navigate('Sign')}
          underlayColor={'transparent'}
          >
          <sg.Pcaption style={{...mixin.ListEmptyComponentTitleNotSign}}>{strings('titles.signinRequired')}</sg.Pcaption>
        </TouchableHighlight>
      </sg.Wrapper>
    }
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper style={styles.OneWrapper}>
          <sg.H1 style={styles.tabHeader}>{strings('tabs.message')}</sg.H1>
          <FlatList
            style={styles.FlatList}
            contentContainerStyle={styles.FlatList}
            onRefresh={() => {
              this.onRefresh()
            }}
            refreshing={this.state.refreshing}
            // ListHeaderComponent={ListHeaderComponent}
            // ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={ListEmptyComponent}
            onEndReachedThreshold={0.5}
            onEndReached={(info) => {
              if (!this.state.onEndReachedCalledDuringMomentum) {
                this.getAllData()
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
              let itemContent = null
              if (item.content) {
                itemContent = <sg.Pbody style={styles.itemContent}>{item.content}</sg.Pbody>
              }
              return <sg.Wrapper style={styles.itemWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    this.jump2(item)
                  }}
                  underlayColor={'transparent'}
                  style={styles.TouchableHighlight}>
                  <sg.Wrapper style={styles.itemWrapper}>
                    <sg.Wrapper style={styles.itemLeftWrapper}>
                      <Image source={{uri: `${Config.qiniu.root}${item.userId.avatar}`}}
                      style={styles.itemAvatar}>
                      </Image>
                    </sg.Wrapper>
                    <sg.Wrapper style={styles.itemRightWrapper}>
                      <sg.Wrapper style={styles.itemRightTopWrapper}>
                        <sg.Pbody style={styles.itemUsername}>{$api.YesOrNot(item.userId.username, strings('titles.stranger'))}</sg.Pbody>
                        <sg.Pbody style={styles.itemTime}>{item.createdAt}</sg.Pbody>
                      </sg.Wrapper>
                      <sg.Pbody style={styles.itemContent} numberOfLines={1}>{item.content}</sg.Pbody>
                    </sg.Wrapper>
                  </sg.Wrapper>
                </TouchableHighlight>
              </sg.Wrapper>
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
)(_3)

const styles = StyleSheet.create({
  OneWrapper: {
  },
  tabHeader: {
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.lg,
  },
  FlatList: {
    // paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.max
  },
  TouchableHighlight: {
    flex: 1,
    padding: mixin.padding.nm,
    // paddingTop: mixin.padding.sm,
    // paddingBottom: mixin.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  itemLeftWrapper: {
  },
  itemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: mixin.color.bg_color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  itemRightWrapper: {
    flex: 1
  },
  itemRightTopWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  itemUsername: {
    flex: 1,
    paddingLeft: 10,
    lineHeight: 20,
    fontWeight:  mixin.fw.max
  },
  itemTime: {
    lineHeight: 20,
    color: mixin.fc.gray
  },
  itemContent: {
    flex: 1,
    paddingLeft: 10,
    lineHeight: 30,
    color: mixin.fc.gray
  }
})
