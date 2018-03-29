import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
// 统计
import Config from '../_config'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { strings } from '../i18n'
export default class Banner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allData: []
    }
  }
  componentWillMount () {
    this.getData()
  }
  // 接收到prop变化
  componentWillReceiveProps () {
    let refreshing = this.props.refreshing
    if (refreshing) {
      this.setState({
        allData: []
      }, () => {
        this.getData()
      })
    }
  }
  getData () {
    $api.$fetch('Post', $api.articleSuggest, {pageSize: 3}).then((res) => {
      if (res.code === 0) {
        this.setState({
          allData: res.data
        })
      }
    }).catch((err) => {
    })
  }
  toDetail (item, bannerNum) {
    if (item && item._id) {
      this.props.navigation.navigate('DetailArticle', item)
    }
    if (bannerNum) {
      let tracker = new GoogleAnalyticsTracker(Config.GAID, {})
      tracker.trackEvent("Banner", bannerNum)
    }
  }
  render() {
    let BannerWrapper = null
    if (this.state.allData && this.state.allData.length > 0) {
      // BannerWrapper = <sg.Wrapper style={styles.wrapper}>
      //   {
      //     this.state.allData.map((item) => {
      //       return <View style={styles.slide} key={item._id}>
      //         <sg.Pcaption numberOfLines={1} style={styles.title}>{item.title}</sg.Pcaption>
      //         <TouchableHighlight
      //           style={styles.slide_touch}
      //           onPress={() => this.toDetail(item)}
      //           underlayColor={mixin.color.bg_color}>
      //           <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
      //           </Image>
      //         </TouchableHighlight>
      //       </View>
      //     })
      //   }
      // </sg.Wrapper>
      BannerWrapper = <Swiper style={styles.wrapper}
        showsPagination={true}
        loop={true}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        autoplay={true}
        autoplayTimeout={20}
        bounces={true}
        >
        <View style={styles.slide}>
          <sg.Pcaption numberOfLines={1} style={styles.title}>{this.state.allData[0].title}</sg.Pcaption>
          <TouchableHighlight
            style={styles.slide_touch}
            onPress={() => this.toDetail(this.state.allData[0], 'banner1')}
            underlayColor={mixin.color.bg_color}>
            <Image source={{uri: this.state.allData[0].imgUrl}} style={styles.imgUrl}>
            </Image>
          </TouchableHighlight>
        </View>
        <View style={styles.slide}>
          <sg.Pcaption numberOfLines={1} style={styles.title}>{this.state.allData[1].title}</sg.Pcaption>
          <TouchableHighlight
            style={styles.slide_touch}
            onPress={() => this.toDetail(this.state.allData[1], 'banner2')}
            underlayColor={mixin.color.bg_color}>
            <Image source={{uri: this.state.allData[1].imgUrl}} style={styles.imgUrl}>
            </Image>
          </TouchableHighlight>
        </View>
        <View style={styles.slide}>
          <sg.Pcaption numberOfLines={1} style={styles.title}>{this.state.allData[2].title}</sg.Pcaption>
          <TouchableHighlight
            style={styles.slide_touch}
            onPress={() => this.toDetail(this.state.allData[2], 'banner3')}
            underlayColor={mixin.color.bg_color}>
            <Image source={{uri: this.state.allData[2].imgUrl}} style={styles.imgUrl}>
            </Image>
          </TouchableHighlight>
        </View>
        <View style={styles.slide}>
          <sg.Pcaption numberOfLines={1} style={styles.title}>点击下方的广告，支持一下</sg.Pcaption>
          <TouchableHighlight
            style={[styles.slide_touch, styles.slide_touch_ad]}
            onPress={() => this.toDetail({}, 'banner4 广告')}
            underlayColor={mixin.color.bg_color}>
            <sg.Wrapper style={styles.AdBanner}>
              <AdMobBanner
                adSize="mediumRectangle"
                adUnitID="ca-app-pub-6546234661958235/7558584498"
                testDevices={[AdMobBanner.simulatorId]}
                // onAdFailedToLoad={error => console.error(error)}
              />
            </sg.Wrapper>
          </TouchableHighlight>
        </View>

        {/* {
          this.state.allData.map((item) => {
            return <View style={styles.slide} key={item._id}>
              <sg.Pcaption numberOfLines={1} style={styles.title}>{item.title}</sg.Pcaption>
              <TouchableHighlight
                style={styles.slide_touch}
                onPress={() => this.toDetail(item)}
                underlayColor={mixin.color.bg_color}>
                <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
                </Image>
              </TouchableHighlight>
            </View>
          })
        } */}
      </Swiper>
    }
    return (
      <sg.Wrapper style={styles.container}>
        <sg.H1 style={styles.type}>{strings('titles.suggest')}</sg.H1>
        {BannerWrapper}
      </sg.Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: H + 120
  },
  // wrapper: {
  // },
  // paginationStyle: {
  //   bottom: 30
  // },
  // dotStyle: {
  //   marginLeft: 5,
  //   marginRight: 5,
  //   backgroundColor: mixin.color.bg_color
  // },
  // activeDotStyle: {
  //   color: mixin.color.main
  // },
  type: {
    paddingHorizontal: mixin.padding.nm,
    marginTop: mixin.padding.lg
  },
  title: {
    marginBottom: mixin.padding.nm,
    color: mixin.fc.gray_sub
  },
  slide: {
    padding: mixin.padding.nm,
    flex: 1
  },
  slide_touch: {
    flex: 1,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: mixin.radius.nm,
    shadowOpacity: 1,
  },
  imgUrl: {
    position: 'relative',
    flex:1,
    alignItems: 'stretch',
    borderRadius: mixin.radius.nm,
    backgroundColor: mixin.color.bg_color
  },
  slide_touch_ad: {
    backgroundColor: mixin.color.bg_color,
    overflow: 'hidden',
    borderRadius: mixin.radius.nm,
    borderWidth: 1,
    borderColor: mixin.color.border
  },
  AdBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  }
})
