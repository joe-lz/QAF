import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, ScrollView, Image, FlatList, Button } from 'react-native'

import IconCom from '../components/icon'
import Item from '../_1detail/_article_topic/Item'
import Suggest from './Suggest'

import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import $api from '../_api'
import Config from '../_config'

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../redux/actions/userinfo'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { strings } from '../i18n'
class _tab_topic extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
  }
  onRefresh () {
    this.setState({
      refreshing: true,
      allData: [],
      nextPageNo: 1
    }, () => {
      this.getData()
    })
  }
  getData () {
    if (this.state.nextPageNo > 0) {
      $api.GetList($api.articleTopicList, this.state.allData, this.state.nextPageNo).then((res) => {
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

  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListHeaderComponent = null
    ListHeaderComponent = <sg.Wrapper>
      <Suggest navigation={this.props.navigation} refreshing={this.state.refreshing}></Suggest>
      <sg.H1 style={styles.tabHeader}>{strings('titles.all')}</sg.H1>
    </sg.Wrapper>
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper style={styles.OneWrapper}>
          <FlatList
            style={styles.FlatList}
            onRefresh={() => {
              this.onRefresh()
            }}
            refreshing={this.state.refreshing}
            ListHeaderComponent={ListHeaderComponent}
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
            ListFooterComponent={<sg.Wrapper>
              <sg.Pbody style={{...mixin.Footer}}>{strings('titles.noMore')}</sg.Pbody>
            </sg.Wrapper>}
            data={this.state.allData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              // return <Item item={item} key={item._id} navigation={this.props.navigation}></Item>
              return <sg.Wrapper
                key={item._id}
                navigation={this.props.navigation}
                style={styles.touchWrapper}>
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate('ArticleTopicDetail', item)}
                  underlayColor={mixin.color.bg_color}>
                  <sg.Wrapper style={styles.ItemWrapper}>
                    <Image source={{uri: item.imgUrl}} style={styles.imgUrl}>
                    </Image>
                    <sg.Wrapper style={styles.titleWrapper}>
                      <sg.Pbody style={styles.title} numberOfLines={1}>{item.title}</sg.Pbody>
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
)(_tab_topic)

const styles = StyleSheet.create({
  OneWrapper: {
  },
  tabHeader: {
    paddingTop: mixin.padding.lg,
    paddingBottom: mixin.padding.nm,
  },
  FlatList: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm
  },

  touchWrapper: {
    marginBottom: 10,
  },
  ItemWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imgUrl: {
    width: 40,
    height: 30,
    borderRadius: mixin.radius.sm,
    alignItems: 'stretch',
    backgroundColor: mixin.color.bg_color,
  },
  titleWrapper: {
    flex: 1,
    paddingLeft: 15
  },
  title: {
    lineHeight: 30,
    color: mixin.color.primary,
    fontWeight: mixin.fw.max,
    fontSize: mixin.fs.lg
  }
})
