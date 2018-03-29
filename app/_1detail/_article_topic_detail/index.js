import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, FlatList } from 'react-native'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import IconCom from '../../components/icon'
import ListItemCom from '../../components/listItem'
import HeaderCom from '../../components/header'
import Item from '../../_1/Item'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import $api from '../../_api'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'

import { strings } from '../../i18n'
class ArticleTopicDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
      $api.GetList($api.articleTopicDetail, this.state.allData, this.state.nextPageNo, {
        topicId: this.props.navigation.state.params._id
      }).then((res) => {
        console.log(res)
        this.setState({
          allData: res.allData,
          nextPageNo: res.nextPageNo,
          onEndReachedCalledDuringMomentum: true
        })
      })
    }
  }
  toDetail (item) {
    this.props.navigation.navigate('DetailArticle', item)
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListHeaderComponent = null
    ListHeaderComponent = <sg.Wrapper style={{...mixin.AdWrapper}}>
      <sg.Wrapper style={{...mixin.AdWrapperContent}}>
        <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-6546234661958235/2163142802"
          testDevices={[AdMobBanner.simulatorId]}
          // onAdFailedToLoad={error => console.error(error)}
        />
      </sg.Wrapper>
    </sg.Wrapper>

    let ListFooterComponent = <sg.Wrapper>
      <sg.Pbody style={{...mixin.Footer}}>{strings('titles.noMore')}</sg.Pbody>
    </sg.Wrapper>
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={this.props.navigation.state.params.title}
            navigation={this.props.navigation}>
          </HeaderCom>
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
              ListHeaderComponent={ListHeaderComponent}
              ListFooterComponent={ListFooterComponent}
              data={this.state.allData}
              keyExtractor={item => item._id}
              renderItem={({item}) => {
                return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
                // return <TouchableHighlight
                //   style={styles.slide_touch}
                //   onPress={() => this.toDetail(item)}
                //   underlayColor={mixin.color.bg_color}>
                //   <sg.Pbody numberOfLines={1} style={styles.itemWrapper}>{item ? item.title : '加载中'}</sg.Pbody>
                // </TouchableHighlight>
            }}/>
          </sg.Wrapper>
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
)(ArticleTopicDetail)

const styles = StyleSheet.create({
  FlatList: {
    paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.nm
  },
  itemWrapper: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    height: 40,
    lineHeight: 40,
    color: mixin.fc.gray
  }
})
