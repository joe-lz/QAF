import React, { Component } from 'react'
import { Text, Platform, StyleSheet, TouchableHighlight, FlatList, Image, ScrollView, Alert } from 'react-native'
import Modal from 'react-native-modalbox'
import ActionSheet from 'react-native-actionsheet'
import Toast, {DURATION} from 'react-native-easy-toast'

import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-cn'

import IconCom from '../../components/icon'
import ListItemCom from '../../components/listItem'
import HeaderCom from '../../components/header'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import $api from '../../_api'
import Config from '../../_config'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'

import { strings } from '../../i18n'
class UserPostDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMe: false,
      nextPageNo: 1,
      allData: []
    }
  }
  componentWillMount () {
    this.getData()
  }
  getData () {
    let item = this.props.navigation.state.params
    if (this.state.nextPageNo > 0) {
      let body = {
        userpostId: item._id
      }
      // 用于判断是否是自己
      body.userId = item.userId._id ? item.userId._id : item.userId
      $api.GetList($api.comment, this.state.allData, this.state.nextPageNo, body, 5).then((res) => {
        let allData = res.allData
        this.setState({
          isMe: res.extraData.isMe,
          allData: allData,
          nextPageNo: res.nextPageNo
        })
      })
    }
  }
  handleDelete () {
    Alert.alert(
      strings('titles.giveup'),
      '',
      [
        {text: strings('buttons.delete'), onPress: () => {
          reject()
        }},
        {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  showActionSheet () {
    this.ActionSheet.show()
  }
  handleActionPress (e) {
    if (e == 1) {
      // 举报
      Alert.alert(
        strings('titles.giveup'),
        '',
        [
          {text: strings('buttons.report'), onPress: () => {
            this.refs.toast.show(strings('buttons.success'))
          }},
          {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        { cancelable: false }
      )
    } else if (e == 2) {
    }
  }
  render() {
    let item = this.props.navigation.state.params
    const {navigate, goBack, state} = this.props.navigation
    let PostContent = null
    if (item && item.content) {
      PostContent = <sg.Pcaption style={styles.postInfoContent}>{item.content}</sg.Pcaption>
    }

    let HeaderComWrapper = <HeaderCom
      title={strings('titles.Photo')}
      navigation={this.props.navigation}>
    </HeaderCom>
    if (this.state.isMe) {
      HeaderComWrapper = <HeaderCom
        title={strings('titles.Photo')}
        // btnTitle={strings('buttons.delete')}
        // onPress={this.handleDelete.bind(this)}
        navigation={this.props.navigation}>
      </HeaderCom>
    } else {
      HeaderComWrapper = <sg.Wrapper style={{...mixin.HeaderWrapper}}>
        <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
          <IconCom name='angle-left' onPress={this.props.navigation.goBack.bind(this)}></IconCom>
        </sg.Wrapper>
        <sg.Wrapper style={{...mixin.HeaderMiddleCom}}>
          <sg.H3 numberOfLines={1} style={{...mixin.HeaderMiddleTitle}}>{strings('titles.Photo')}</sg.H3>
        </sg.Wrapper>
        <sg.Wrapper style={{...mixin.HeaderRightCom}}>
          <IconCom type='MD' name='dots-horizontal' size={mixin.icon.nm} onPress={this.showActionSheet.bind(this)}></IconCom>
        </sg.Wrapper>
      </sg.Wrapper>
    }
    const title = ''
    const options = [
      strings('buttons.cancel'),
      strings('buttons.report'),
      // strings('buttons.dontlikethis'),
    ]
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          {HeaderComWrapper}
          <ActionSheet
            ref={o => this.ActionSheet = o}
            // title={title}
            options={options}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            onPress={this.handleActionPress.bind(this)}
          />
          <Toast
            ref="toast"
            position='top'
            opacity={1}/>
          <sg.Wrapper style={styles.SendImageComWrapper}>
            <TouchableHighlight
              onPress={() => navigate('CommentList', {
                _id: item._id,
                type: 'userpost',
                posterId: item.userId._id ? item.userId._id : item.userId
              })}
              underlayColor={'transparent'}>
              <sg.Wrapper style={styles.SendImageCom}>
                <sg.Wrapper style={styles.SendImageIconWrapper}>
                  <IconCom
                    type='MD'
                    name='comment-processing-outline'
                    size={mixin.icon.mini}
                    color={'white'}></IconCom>
                  </sg.Wrapper>
                  <sg.Pcaption style={styles.SendImageTitle}>{strings('buttons.comments')}</sg.Pcaption>
              </sg.Wrapper>
            </TouchableHighlight>
          </sg.Wrapper>
          <ScrollView style={styles.ScrollView}>
            <sg.Wrapper style={{...mixin.bodyWrapper}}>
              <sg.Wrapper style={styles.postImgWrapper}>
                <Image source={{uri: `${Config.qiniu.root}${item.img}`}} style={styles.postImgUrl}>
                </Image>
              </sg.Wrapper>
              <sg.Wrapper style={styles.postInfoWrapper}>
                <sg.Wrapper style={styles.postButtonWrapper}>
                  <sg.Pcaption style={styles.postlikes}>
                    {/* 22&nbsp;{strings('titles.likes')} */}
                  </sg.Pcaption>
                  {/* <IconCom
                    style={styles.collectIcon}
                    name='heart'
                    color={mixin.fc.gray_sub}
                    size={mixin.icon.sm}
                    onPress={() => {
                    }}>
                    </IconCom> */}
                  {/* <IconCom
                    style={styles.collectIcon}
                    type='MD'
                    name='message-text'
                    color={'white'}
                    // color={mixin.fc.gray_sub}
                    size={mixin.icon.sm}
                    onPress={() => navigate('CommentList', {
                      _id: item._id,
                      type: 'userpost',
                      posterId: item.userId._id ? item.userId._id : item.userId
                    })}>
                    </IconCom> */}
                </sg.Wrapper>
                {PostContent}
              </sg.Wrapper>
              <sg.Wrapper style={styles.commentListWrapper}>
                <TouchableHighlight
                  style={styles.commentItemUsernameWapper}
                  onPress={() => navigate('CommentList', {
                    _id: item._id,
                    type: 'userpost',
                    posterId: item.userId._id ? item.userId._id : item.userId
                  })}
                  underlayColor={'white'}>
                  <sg.Pcaption style={styles.loadMore}>{strings('buttons.viewAllComments')}</sg.Pcaption>
                </TouchableHighlight>
                {
                  this.state.allData.map((obj) => {
                    return <sg.Wrapper style={styles.commentItemWrapper} key={obj._id}>
                      <TouchableHighlight
                         style={styles.commentItemUsernameWapper}
                        onPress={() => navigate('AccountProfile', {userId: obj.userId._id})}
                        underlayColor={'white'}>
                        <sg.Pcaption style={styles.commentItemUsername}>
                          {$api.YesOrNot(obj.userId.username, strings('titles.stranger'))}:
                        </sg.Pcaption>
                      </TouchableHighlight>
                      <sg.Pbody style={styles.commentItemRightContent}>
                        <sg.Pbody style={styles.commentItemRightContentToUser}>
                          @{obj.toUserId ? obj.toUserId.username : strings('titles.stranger')}&nbsp;
                        </sg.Pbody>
                        {obj.content}
                      </sg.Pbody>
                    </sg.Wrapper>
                  })
                }
              </sg.Wrapper>
            </sg.Wrapper>
          </ScrollView>
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
)(UserPostDetail)

const styles = StyleSheet.create({
  postImgWrapper: {
    position: 'relative',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  postImgUrl: {
    width: ScreenWidth,
    height: ScreenWidth,
    backgroundColor: mixin.color.bg_color
  },
  postInfoWrapper: {
    paddingTop: mixin.padding.nm
  },
  postButtonWrapper: {
    position: 'absolute',
    top: -50,
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.sm,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  postInfoContent: {
    marginBottom: mixin.padding.nm,
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    lineHeight: 18,
    fontSize: mixin.fs.nm,
    fontWeight: mixin.fw.max
  },
  postlikes: {
    flex: 1,
    lineHeight: 44,
    fontSize: mixin.fs.nm,
    fontWeight: mixin.fw.max
  },
  commentItemWrapper: {
    padding: mixin.padding.nm,
    paddingBottom: 0,
    paddingTop: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  commentItemUsername: {
    fontWeight: mixin.fw.max,
    paddingRight: 5
  },
  commentItemRightContent: {
    flex: 1,
    lineHeight: 20
  },
  commentItemRightContentToUser: {
    fontWeight: mixin.fw.max,
  },
  loadMore: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    fontWeight: mixin.fw.max,
    color: mixin.fc.gray
  },
  // -------------------------- 按钮样式
  SendImageComWrapper: {
    position: 'absolute',
    zIndex: 100,
    bottom: 30,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  SendImageCom: {
    position: 'relative',
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    borderRadius: 22,
    backgroundColor: 'rgba(56, 137, 255, 0.9)',
  },
  SendImageIconWrapper: {
    position: 'absolute',
    left: 0,
    top: -3
  },
  SendImageTitle: {
    marginLeft: 20,
    color: 'white',
    lineHeight: 35,
    fontSize: mixin.fs.nm
  },
})
