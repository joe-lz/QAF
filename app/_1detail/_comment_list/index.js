import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, FlatList, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-cn'

import IconCom from '../../components/icon'
import ListItemCom from '../../components/listItem'
import HeaderCom from '../../components/header'

import mixin from '../../styleguide/mixin'
import sg from '../../styleguide'
import $api from '../../_api'
import Config from '../../_config'

import { strings } from '../../i18n'
export default class CommentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toUser: null,
      placeholder: strings('buttons.enter'),
      content: '',
      allData: [],
      nextPageNo: 1,
      onEndReachedCalledDuringMomentum: false
    }
  }
  componentWillMount () {
    this.getData()
  }
  getData () {
    if (this.state.nextPageNo > 0) {
      let body = {}
      if (this.props.navigation.state.params.type === 'article') {
        body.articleId = this.props.navigation.state.params._id
      } else if (this.props.navigation.state.params.type === 'userpost') {
        body.userpostId = this.props.navigation.state.params._id
      }
      $api.GetList($api.comment, this.state.allData, this.state.nextPageNo, body).then((res) => {
        let allData = res.allData
        this.setState({
          allData: allData,
          nextPageNo: res.nextPageNo,
          onEndReachedCalledDuringMomentum: true
        })
      })
    }
  }
  addComment () {
    let toUserId = (this.state.toUser && this.state.toUser._id) ? this.state.toUser._id : this.props.navigation.state.params.posterId
    let body = {
      content: this.state.content,
      toUserId
    }
    if (this.props.navigation.state.params.type === 'article') {
      body.articleId = this.props.navigation.state.params._id
    } else if (this.props.navigation.state.params.type === 'userpost') {
      body.userpostId = this.props.navigation.state.params._id
    }
    $api.SignRequired().then((res) => {
      $api.$fetch('Post', $api.commentAdd, body).then((res) => {
        this.setState({
          content: '',
          allData: [],
          nextPageNo: 1,
          onEndReachedCalledDuringMomentum: false
        })
        this.getData()
      }).catch((err) => {
      })
    }).catch(() => {
      this.props.navigation.navigate('Sign')
    })
  }
  onChange (value) {
    this.setState({
      content: value
    })
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ButtonSubmit = <sg.Pbody style={[styles.commentSendButton, styles.commentSendButtonDisabled]}>{strings('buttons.send')}</sg.Pbody>
    if (this.state.content) {
      ButtonSubmit = <TouchableHighlight
        style={styles.slide_touch}
        onPress={() => this.addComment()}
        underlayColor={'transparent'}>
        <sg.Pbody style={styles.commentSendButton}>{strings('buttons.send')}</sg.Pbody>
      </TouchableHighlight>
    }
    let ListEmptyComponent = <sg.Wrapper style={styles.ListEmptyComponent}>
      <sg.Pcaption style={{...mixin.ListEmptyComponentTitle}}>{strings('titles.noData')}</sg.Pcaption>
    </sg.Wrapper>
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={strings('buttons.comments')}
            navigation={this.props.navigation}>
          </HeaderCom>
          {/* <sg.Wrapper style={{...mixin.HeaderWrapper}}>
            <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
              <IconCom name='angle-left' onPress={this.props.navigation.goBack.bind(this)}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper> */}
          <sg.Wrapper style={{...mixin.bodyWrapper}}>
            <FlatList
              style={styles.FlatList}
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
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({item}) => {
                return <sg.Wrapper style={styles.commentItem}>
                  <TouchableHighlight
                    style={styles.slide_touch}
                    onPress={() => navigate('AccountProfile', {userId: item.userId._id})}
                    underlayColor={'white'}>
                    <Image source={{uri: `${Config.qiniu.root}${item.userId.avatar}`}} style={styles.commentItemAvatar}>
                    </Image>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.commentItemRight}
                    onPress={() => {
                      // set toUser and toUserId
                      this.setState({
                        toUser: item.userId,
                        placeholder: `@${item.userId.username}`
                      })
                    }}
                    underlayColor={'white'}>
                    <sg.Wrapper>
                      <sg.Wrapper style={styles.commentItemRightTop}>
                        <sg.Pbody style={styles.commentItemRightUsername}>
                          {$api.YesOrNot(item.userId.username, strings('titles.stranger'))}
                        </sg.Pbody>
                        <sg.Pbody style={styles.commentItemRightTime}>{item.createdAt}</sg.Pbody>
                      </sg.Wrapper>
                      <sg.Pbody style={styles.commentItemRightContent}>
                        <sg.Pbody style={styles.commentItemRightContentToUser}>
                          @{item.toUserId ? item.toUserId.username : strings('titles.stranger')}&nbsp;
                        </sg.Pbody>
                        {item.content}
                      </sg.Pbody>
                    </sg.Wrapper>
                  </TouchableHighlight>
                </sg.Wrapper>
            }}/>
            <KeyboardAvoidingView
              behavior='padding'
              keyboardVerticalOffset={
                Platform.select({
                  ios: () => 160,
                  android: () => 160
                })()
              }
              style={styles.commentWrapper}>
              <TextInput
                placeholder={this.state.placeholder}
                value={this.state.content}
                style={styles.inputWrapper}
                // autoFocus={true}
                onChangeText={(value) => this.onChange(value)}>
              </TextInput>
              {ButtonSubmit}
            </KeyboardAvoidingView>
          </sg.Wrapper>
        </sg.OneWrapper>
      </sg.SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  ListEmptyComponent: {
  },
  FlatList: {
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.lg
  },
  commentItem: {
    marginBottom: mixin.padding.lg,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  commentItemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: mixin.color.bg_color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  commentItemRight: {
    flex: 1,
    paddingLeft: mixin.padding.nm
  },
  commentItemRightTop: {
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  commentItemRightUsername: {
    flex: 1,
    lineHeight: 20,
    fontWeight: mixin.fw.max
  },
  commentItemRightTime: {
    color: mixin.fc.gray,
    fontSize: mixin.fs.sm,
    lineHeight: 20
  },
  commentItemRightContent: {
    fontSize: mixin.fs.sm,
    color: mixin.fc.gray,
    lineHeight: 20,
    textAlign: 'justify'
  },
  commentItemRightContentToUser: {
    color: mixin.fc.main,
    fontWeight: mixin.fw.max
  },
  commentWrapper: {
    paddingLeft: mixin.padding.nm,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
    overflow: 'hidden'
  },
  inputWrapper: {
    flex: 1,
    height: 50,
    lineHeight: 50
  },
  commentSendButton: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    height: 50,
    lineHeight: 50,
    fontWeight: mixin.fw.max,
    fontSize: mixin.fs.lg,
    color: mixin.color.primary
  },
  commentSendButtonDisabled: {
    color: mixin.color.disabled
  }
})
