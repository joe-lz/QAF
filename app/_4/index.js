import React, { Component } from 'react'
import { AppState, Platform, StyleSheet, ScrollView, TouchableHighlight, Alert, View } from 'react-native'
// 统计
import Config from '../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import UserInfo from './UserInfo'
import IconCom from '../components/icon'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../redux/actions/userinfo'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { strings } from '../i18n'
class _4 extends Component {
  componentWillMount () {
    let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
    tracker.trackScreenView("Me")
  }
  // handleSignout () {
  //   Alert.alert(
  //     strings('titles.signoutTitle'),
  //     '',
  //     [
  //       {text: strings('buttons.yes'), onPress: () => {
  //         $api.RemoveStorage('Auth')
  //         this.props.dispatchGET_USERINFO()
  //       }},
  //       {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
  //     ],
  //     { cancelable: false }
  //   )
  // }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let MainPage = null
    if (this.props.userinfo) {
      MainPage = <sg.Wrapper>
        <UserInfo navigation={this.props.navigation}></UserInfo>
        <sg.Wrapper style={styles.menuListsWrapper}>
          <TouchableHighlight
            style={styles.container}
            onPress={() => navigate('AccountCollect')}
            underlayColor={ mixin.color.bg_color }>
            <sg.Wrapper style={styles.menuItemWrapper}>
              <sg.H3 style={styles.menuTitle}>{strings('buttons.collectSetting')}</sg.H3>
              <sg.Wrapper style={styles.menuRightIcon}>
                <IconCom name='star-o'></IconCom>
              </sg.Wrapper>
            </sg.Wrapper>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.container}
            onPress={() => navigate('AccountReadHistory')}
            underlayColor={ mixin.color.bg_color }>
            <sg.Wrapper style={styles.menuItemWrapper}>
              <sg.H3 style={styles.menuTitle}>{strings('buttons.history')}</sg.H3>
              <sg.Wrapper style={styles.menuRightIcon}>
                <IconCom name='file-text-o'></IconCom>
              </sg.Wrapper>
            </sg.Wrapper>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.container}
            onPress={() => navigate('AccountSetting')}
            underlayColor={ mixin.color.bg_color }>
            <sg.Wrapper style={styles.menuItemWrapper}>
              <sg.H3 style={styles.menuTitle}>{strings('buttons.accountSetting')}</sg.H3>
              <sg.Wrapper style={styles.menuRightIcon}>
                <IconCom name='user-o'></IconCom>
              </sg.Wrapper>
            </sg.Wrapper>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.container}
            onPress={() => navigate('WebViewDetail', {
              url: $api.webviewAbout,
              title: strings('titles.about')
            })}
            underlayColor={ mixin.color.bg_color }>
            <sg.Wrapper style={styles.menuItemWrapper}>
              <sg.H3 style={styles.menuTitle}>{strings('titles.about')}</sg.H3>
              <sg.Wrapper style={styles.menuRightIcon}>
                <IconCom type='MD' name='information-outline'></IconCom>
              </sg.Wrapper>
            </sg.Wrapper>
          </TouchableHighlight>
        </sg.Wrapper>
      </sg.Wrapper>
    } else {
      MainPage = <sg.Wrapper>
        <UserInfo navigation={this.props.navigation}></UserInfo>
        <sg.Wrapper style={styles.menuListsWrapper}>
          <sg.Wrapper style={styles.menuItemWrapper}>
            <sg.H3 style={[styles.menuTitle, styles.menuTitleDisable]}>{strings('buttons.collectSetting')}</sg.H3>
            <sg.Wrapper style={styles.menuRightIcon}>
              <IconCom name='star-o' color={mixin.fc.gray_sub}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper>
          <sg.Wrapper style={styles.menuItemWrapper}>
            <sg.H3 style={[styles.menuTitle, styles.menuTitleDisable]}>{strings('buttons.history')}</sg.H3>
            <sg.Wrapper style={styles.menuRightIcon}>
              <IconCom name='file-text-o' color={mixin.fc.gray_sub}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper>
          <sg.Wrapper style={styles.menuItemWrapper}>
            <sg.H3 style={[styles.menuTitle, styles.menuTitleDisable]}>{strings('buttons.accountSetting')}</sg.H3>
            <sg.Wrapper style={styles.menuRightIcon}>
              <IconCom name='user-o' color={mixin.fc.gray_sub}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper>
          <sg.Wrapper style={styles.menuItemWrapper}>
            <sg.H3 style={[styles.menuTitle, styles.menuTitleDisable]}>{strings('titles.about')}</sg.H3>
            <sg.Wrapper style={styles.menuRightIcon}>
              <IconCom type='MD' name='information-outline' color={mixin.fc.gray_sub}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper>
        </sg.Wrapper>
      </sg.Wrapper>
    }
    return (
      <sg.SafeArea style={styles.safeArea}>
          <sg.OneWrapper style={styles.container}>
            {MainPage}
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
)(_4)

const styles = StyleSheet.create({
  container: {
  },
  menuListsWrapper: {
    paddingTop: mixin.padding.nm,
  },
  menuItemWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    height: 84,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
    overflow: 'hidden'
  },
  menuTitle: {
    flex: 1,
    lineHeight: 83
  },
  menuTitleDisable: {
    color: mixin.fc.gray_sub
  },
  menuRightIcon: {
    paddingTop: 22
  }
})
