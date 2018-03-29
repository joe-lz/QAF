import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, ScrollView, Image, FlatList, Button } from 'react-native'
import Modal from 'react-native-modalbox'
import Toast, {DURATION} from 'react-native-easy-toast'
// 统计
import Config from '../../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import IconCom from '../../components/icon'
import HeaderCom from '../../components/header'
import SendImageCom from './SendImageCom'
import UserInfo from './UserInfo'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import $api from '../../_api'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const margin = 10
const blockWidth = ScreenWidth/3
const imgWidth = (ScreenWidth - (4 * margin))/3
const blockHeight = blockWidth/(9/9)

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'
import { changeLoading } from '../../redux/actions/globalValue'

import { strings } from '../../i18n'
class AccountProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMe: false,
      userinfo: {
      },
      refreshing: false,
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }
  }
  componentWillMount () {
    this.getData()
    this.getPostData()
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("AccountProfile")
  }
  getData () {
    $api.$fetch('Post', $api.userInfoById, {
      userId: this.props.navigation.state.params.userId
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          userinfo: res.data.curUser,
          isMe: res.data.isMe
        }, () => {
        })
      }
    })
  }
  getPostData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.userpostAll,
        this.state.allData,
        this.state.nextPageNo,
        {userId: this.props.navigation.state.params.userId}).then((res) => {
        console.log(res)
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
  onRefresh () {
    this.setState({
      refreshing: true,
      allData: [],
      nextPageNo: 1
    }, () => {
      this.getPostData()
    })
  }
  onResult (msg) {
    this.setState({
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }, () => {
      setTimeout(() => {
        this.props.dispatchCHANGE_LOADING(false)
        this.getPostData()
        this.refs.toast.show(msg)
      }, 1000)
    })
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let EditCom = null
    let isSendImageCom = null
    if (this.state.isMe) {
      EditCom = <sg.Wrapper>
        <IconCom name='cog'
          size={mixin.icon.sm}
          color={mixin.fc.main}
          onPress={() => navigate('AccountSetting')}></IconCom>
      </sg.Wrapper>
      isSendImageCom = <SendImageCom navigation={this.props.navigation} onResult={this.onResult.bind(this)}></SendImageCom>
    }
    let ListFooterComponent = null
    if (this.state.nextPageNo > 1) {
      ListFooterComponent = <sg.Wrapper style={styles.ListFooterComponent}>
        <Button onPress={this.getPostData.bind(this)} title={strings('buttons.loadMore')}></Button>
      </sg.Wrapper>
    }
    return (
      <sg.OneWrapper style={styles.OneWrapper}>
        <Toast
          ref="toast"
          position='center'
          opacity={0.8}/>
        <sg.Wrapper style={styles.HeaderCom}>
           <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
             <IconCom
               name='angle-left'
               color={mixin.fc.main}
               onPress={goBack.bind(this)}></IconCom>
           </sg.Wrapper>
           {EditCom}
        </sg.Wrapper>
        <FlatList
          numColumns={3}
          columnWrapperStyle={styles.columnWrapperStyle}
          style={styles.FlatList}
          contentContainerStyle={styles.FlatList}
          onRefresh={() => {
            this.onRefresh()
          }}
          refreshing={this.state.refreshing}
          ListHeaderComponent={<UserInfo userinfo={this.state.userinfo}></UserInfo>}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={
            <sg.Wrapper style={styles.ListEmptyComponent}>
              <sg.Pcaption style={{...mixin.ListEmptyComponentTitle}}>{strings('titles.noData')}</sg.Pcaption>
            </sg.Wrapper>
          }
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
            let ItemWrapper = null
            if ((index+1)%3 === 1) {
              ItemWrapper = <Image source={{uri: `${Config.qiniu.root}${item.img}`}} style={[styles.postImgUrl, styles.postImgUrl1]}>
              </Image>
            } else {
              ItemWrapper = <Image source={{uri: `${Config.qiniu.root}${item.img}`}} style={styles.postImgUrl}>
              </Image>
            }
            return <TouchableHighlight
              key={item._id}
              style={styles.touchWrapper}
              onPress={() => {
                this.props.navigation.navigate('UserPostDetail', item)
              }}
              underlayColor={'transparent'}>
              {ItemWrapper}
            </TouchableHighlight>
        }}/>
        {isSendImageCom}
      </sg.OneWrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    // userinfo: state.userinfo
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchGET_USERINFO: () => dispatch(handleGET_USERINFO()),
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountProfile)

const styles = StyleSheet.create({
  OneWrapper: {
  },
  HeaderCom: {
    paddingTop: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1000,
    top: 30,
    height: 60,
    width: '100%'
  },
  FlatList: {
    paddingBottom: 100,
  },
  ListFooterComponent: {
    paddingTop: mixin.padding.lg
  },
  columnWrapperStyle: {
  },
  touchWrapper: {
    position: 'relative',
    zIndex: 1,
    marginTop: 10,
  },
  postImgUrl1: {
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  postImgUrl: {
    marginRight: 10,
    width: imgWidth,
    height: imgWidth,
    backgroundColor: mixin.color.bg_color
  }
})
