import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation"

import mixin from './styleguide/mixin'
import _1Screen from './_1'
import _2Screen from './_2'
import _3Screen from './_3'
import _4Screen from './_4'
import _tab_topicScreen from './_tab_topic'

import SignScreen from './_sign'
import SignCodeScreen from './_sign/code'
import DetailArticleScreen from './_1detail/_detail_article'
import CommentListScreen from './_1detail/_comment_list'
import ArticleTopicScreen from './_1detail/_article_topic'
import ArticleNewScreen from './_1detail/_article_new'
import ArticleTopicDetailScreen from './_1detail/_article_topic_detail'
import AccountProfileScreen from './_4detail/_account_profile'
import UserPostDetailScreen from './_4detail/_user_post_detail'
import AccountCollectScreen from './_4detail/_account_collect'
import AccountReadHistoryScreen from './_4detail/_account_read_history'
import AccountSettingScreen from './_4detail/_account_setting'
import AccountSettingDetailScreen from './_4detail/_account_setting/_account_setting_detail'
import WebViewDetailScreen from './_webview_detail'

import { strings } from './i18n'
const Tabs = TabNavigator({
  _1Screen: {
    screen: _1Screen,
    navigationOptions: {
      tabBarLabel: strings('tabs.articles'),
      tabBarIcon: ({tintColor, focused }) => (
        <Image
            source={focused ? require('./images/tab-icon/headline2.png') : require('./images/tab-icon/headline.png')}
            style={[styles.icon]}
        />
        // <Image
        //   source={require('./images/tab-icon/art2.png')}
        //   style={[styles.icon, {tintColor: tintColor}]}
        // />
      )
    }
  },
  // _tab_topicScreen: {
  //   screen: _tab_topicScreen,
  //   navigationOptions: {
  //     tabBarLabel: strings('tabs.topic'),
  //     tabBarIcon: ({ tintColor, focused }) => (
  //       // <Image
  //       //     source={focused ? require('./images/tab-icon2/_4.png') : require('./images/tab-icon2/_4.1.png')}
  //       //     style={[styles.icon]}
  //       // />
  //       <Image
  //         source={require('./images/tab-icon/topic.png')}
  //         style={[styles.icon, {tintColor: tintColor}]}
  //       />
  //     )
  //   }
  // },
  _2Screen: {
    screen: _2Screen,
    navigationOptions: {
      tabBarLabel: strings('tabs.posts'),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
            source={focused ? require('./images/tab-icon/flash2.png') : require('./images/tab-icon/flash.png')}
            style={[styles.icon]}
        />
        // <Image
        //   source={require('./images/tab-icon/refresh.png')}
        //   style={[styles.icon, {tintColor: tintColor}]}
        // />
      )
    }
  },
  _3Screen: {
    screen: _3Screen,
    navigationOptions: {
      tabBarLabel: strings('tabs.message'),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
            source={focused ? require('./images/tab-icon/interactive2.png') : require('./images/tab-icon/interactive.png')}
            style={[styles.icon]}
        />
        // <Image
        //   source={require('./images/tab-icon/message.png')}
        //   style={[styles.icon, {tintColor: tintColor}]}
        // />
      )
    }
  },
  _4Screen: {
    screen: _4Screen,
    navigationOptions: {
      tabBarLabel: strings('tabs.me'),
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
            source={focused ? require('./images/tab-icon/card2.png') : require('./images/tab-icon/card.png')}
            style={[styles.icon]}
        />
        // <Image
        //   source={require('./images/tab-icon/account.png')}
        //   style={[styles.icon, {tintColor: tintColor}]}
        // />
      )
    }
  }
}, {
  // animationEnabled: true,
  tabBarOptions: {
    showLabel: true,
    inactiveTintColor: mixin.fc.gray_sub,
    activeTintColor: mixin.fc.main,
    // activeTintColor: mixin.color.primary,
    labelStyle: {
      fontWeight: mixin.fw.max
    },
    style: {
      backgroundColor: 'white'
    }
  }
})

export const MainScreenNavigator = StackNavigator({
  Tab: {
    screen: Tabs,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Sign: {
    screen: SignScreen,
    navigationOptions: {
      // gesturesEnabled: false
    }
  },
  SignCode: {
    screen: SignCodeScreen,
    navigationOptions: {}
  },
  DetailArticle: {
    screen: DetailArticleScreen,
    navigationOptions: {}
  },
  CommentList: {
    screen: CommentListScreen,
    navigation: {}
  },
  ArticleNew: {
    screen: ArticleNewScreen,
    navigation: {}
  },
  ArticleTopic: {
    screen: ArticleTopicScreen,
    navigation: {}
  },
  ArticleTopicDetail: {
    screen: ArticleTopicDetailScreen,
    navigation: {}
  },
  AccountProfile: {
    screen: AccountProfileScreen,
    navigationOptions: {}
  },
  UserPostDetail: {
    screen: UserPostDetailScreen,
    navigationOptions: {}
  },
  AccountCollect: {
    screen: AccountCollectScreen,
    navigationOptions: {}
  },
  AccountReadHistory: {
    screen: AccountReadHistoryScreen,
    navigationOptions: {}
  },
  AccountSetting: {
    screen: AccountSettingScreen,
    navigationOptions: {}
  },
  AccountSettingDetail: {
    screen: AccountSettingDetailScreen,
    navigationOptions: {}
  },
  WebViewDetail: {
    screen: WebViewDetailScreen,
    navigationOptions: {}
  }
}, {
  headerMode: 'none',
  // mode: 'modal'
})

const styles = StyleSheet.create({
  icon: {
    width: mixin.icon.nm,
    height: mixin.icon.nm
  }
})
