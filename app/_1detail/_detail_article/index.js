import React, { Component } from 'react'
import { Platform, StyleSheet, WebView, Linking, TouchableHighlight } from 'react-native'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
// 统计
import Config from '../../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import IconCom from '../../components/icon'

import mixin from '../../styleguide/mixin'
import sg from '../../styleguide'
import $api from '../../_api'

import { strings } from '../../i18n'
export default class _detail_article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isCollect: false,
      ItemInfo: {}
    }
  }
  componentWillMount () {
    this.getData()
  }
  // 获取article详情
  getData () {
    let _id = this.props.navigation.state.params._id
    $api.$fetch('Post', $api.articleInfo, {_id}).then((res) => {
      this.setState({
        ItemInfo: res.data,
        isCollect: Boolean(res.data.isCollect)
      })
      let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
      tracker.trackEvent("Article", res.data.title)
    })
  }
  handleOpen () {
    Linking.openURL(this.state.ItemInfo.videoUrl).catch(err => console.error('An error occurred', err));
  }
  handleCollect () {
    $api.SignRequired().then((res) => {
      let _id = this.props.navigation.state.params._id
      $api.$fetch('Post', $api.collectHandle, {_id}).then((res) => {
        if (res.code === 0) {
          this.setState({
            isCollect: !this.state.isCollect
          })
        }
      })
    }).catch(() => {
      this.props.navigation.navigate('Sign')
    })
  }
  render() {
    let {navigate} = this.props.navigation
    let CollectButton = null
    if (this.state.isCollect) {
      CollectButton = <sg.Wrapper style={styles.buttonWrapper}>
        <IconCom
          style={[styles.collectIcon]}
          name='star'
          color={mixin.color.primary}
          size={mixin.icon.sm}
          onPress={this.handleCollect.bind(this)}></IconCom>
        <sg.Pbody style={[styles.buttonTitle, styles.isCollect]}>{strings('buttons.collectSetting')}</sg.Pbody>
      </sg.Wrapper>
    } else {
      CollectButton = <sg.Wrapper style={styles.buttonWrapper}>
        <IconCom
          style={styles.collectIcon}
          name='star'
          color={mixin.fc.gray_sub}
          size={mixin.icon.sm}
          onPress={this.handleCollect.bind(this)}></IconCom>
        <sg.Pbody style={styles.buttonTitle}>{strings('buttons.collect')}</sg.Pbody>
      </sg.Wrapper>
    }
    let TopicButton = null
    if (this.state.ItemInfo.topicId) {
      TopicButton = <sg.Wrapper style={styles.buttonWrapper}>
        <IconCom
          name='list-alt'
          color={mixin.fc.gray_sub}
          size={mixin.icon.sm}
          onPress={() => navigate('ArticleTopicDetail', this.state.ItemInfo.topicId)}></IconCom>
        <sg.Pbody style={styles.buttonTitle}>{strings('buttons.topiclist')}</sg.Pbody>
      </sg.Wrapper>
    }
    let VideoButton = null
    if (this.state.ItemInfo.videoUrl) {
      VideoButton = <sg.Wrapper style={styles.buttonWrapper}>
        <IconCom
          name='youtube-play'
          color={mixin.fc.gray_sub}
          size={mixin.icon.sm}
          onPress={this.handleOpen.bind(this)}></IconCom>
        <sg.Pbody style={styles.buttonTitle}>{strings('buttons.watch')}</sg.Pbody>
      </sg.Wrapper>
    }
    let jsCode = `
      document.querySelector('.rich_media_title').style.fontSize = '20px';
      document.querySelector('.rich_media_title').style.fontWeight = 'bold';
    `
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          {/* <sg.Wrapper style={{...mixin.HeaderWrapper}}>
            <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
              <IconCom name='angle-left' onPress={this.props.navigation.goBack.bind(this)}></IconCom>
            </sg.Wrapper>
            <sg.Wrapper style={{...mixin.HeaderRightCom}}>
              <IconCom name='safari' size={mixin.icon.sm} onPress={this.handleOpen.bind(this)}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper> */}
          {/* <sg.Wrapper style={{...mixin.HeaderWrapper}}>
            <sg.Wrapper style={{...mixin.AdWrapper}}>
              <sg.Wrapper style={{...mixin.AdWrapperContent}}>
                <AdMobBanner
                  adSize="banner"
                  adUnitID="ca-app-pub-6546234661958235/2147255962"
                  testDevices={[AdMobBanner.simulatorId]}
                  // onAdFailedToLoad={error => console.error(error)}
                />
              </sg.Wrapper>
            </sg.Wrapper>
          </sg.Wrapper> */}
          <sg.Wrapper style={{...mixin.bodyWrapper}}>
            <WebView
            source={{uri: this.state.ItemInfo.url}}
            style={styles.webview}
            injectedJavaScript={jsCode}
            // allowsInlineMediaPlayback={true}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            />
            <sg.Wrapper style={styles.operateBar}>
              <sg.Wrapper style={styles.leftWrapper}>
                <IconCom
                  style={styles.collectIcon}
                  type='MD'
                  name='keyboard-backspace'
                  color={mixin.fc.gray_sub}
                  size={mixin.icon.sm}
                  onPress={this.props.navigation.goBack.bind(this)}>
                </IconCom>
              </sg.Wrapper>
              {VideoButton}
              {TopicButton}
              {CollectButton}
              <sg.Wrapper style={styles.buttonWrapper}>
                <IconCom
                  style={styles.collectIcon}
                  type='MD'
                  name='message-text'
                  color={mixin.fc.gray_sub}
                  size={mixin.icon.sm}
                  onPress={() => navigate('CommentList', {
                    _id: this.state.ItemInfo._id,
                    type: 'article',
                    posterId: this.state.ItemInfo.userId
                  })}></IconCom>
                <sg.Pbody style={styles.buttonTitle}>{strings('buttons.comments')}</sg.Pbody>
              </sg.Wrapper>
            </sg.Wrapper>
          </sg.Wrapper>
        </sg.OneWrapper>
      </sg.SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  operateBar: {
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  leftWrapper: {
    flex: 1
  },
  buttonWrapper: {
    position: 'relative',
    paddingLeft: 10
  },
  buttonTitle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    textAlign: 'center',
    color: mixin.fc.gray_sub,
    fontSize: mixin.fs.sm
  },
  isCollect: {
    color: mixin.color.primary
  }
})
