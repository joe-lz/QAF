import React, { Component } from 'react'
import { Platform, StyleSheet, WebView, Linking, TouchableHighlight } from 'react-native'
// 统计
import Config from '../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import IconCom from '../components/icon'
import ListItemCom from '../components/listItem'
import HeaderCom from '../components/header'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'

import { strings } from '../i18n'
export default class _detail_article extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("WebView")
  }
  render() {
    let {navigate, state} = this.props.navigation
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={state.params.title}
            navigation={this.props.navigation}>
          </HeaderCom>
          <sg.Wrapper style={{...mixin.bodyWrapper}}>
            <WebView
            source={{uri: state.params.url}}
            style={styles.webview}
            automaticallyAdjustContentInsets={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            />
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
  }
})
