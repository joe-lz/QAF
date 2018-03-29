import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, FlatList } from 'react-native'
import Modal from 'react-native-modalbox'

import IconCom from '../../components/icon'
import ListItemCom from '../../components/listItem'
import HeaderCom from '../../components/header'

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
class AccountReadHistory extends Component {
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
    $api.$fetch('Post', $api.readhistory, {
      nextPageNo: this.state.nextPageNo,
      pageSize: 20
    }).then((res) => {
      this.setState({
        allData: res.data
      })
    })
  }
  toDetail (item) {
    this.props.navigation.navigate('DetailArticle', item)
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ListFooterComponent = <sg.Wrapper>
      <sg.Pbody style={{...mixin.Footer}}>{strings('titles.myCollectOnly20')}</sg.Pbody>
    </sg.Wrapper>
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={strings('buttons.history')}
            navigation={this.props.navigation}>
          </HeaderCom>
          <sg.Wrapper style={{...mixin.bodyWrapper}}>
            <FlatList
              style={styles.FlatList}
              data={this.state.allData}
              ListFooterComponent={ListFooterComponent}
              ListEmptyComponent={
                <sg.Wrapper style={styles.ListEmptyComponent}>
                  <sg.Pcaption style={{...mixin.ListEmptyComponentTitle}}>{strings('titles.noData')}</sg.Pcaption>
                </sg.Wrapper>
              }
              renderItem={({item}) => {
                return <TouchableHighlight
                  style={styles.slide_touch}
                  onPress={() => this.toDetail(item.articleId)}
                  underlayColor={mixin.color.bg_color}>
                  <sg.Pbody numberOfLines={1} style={styles.itemWrapper}>{item.articleId ? item.articleId.title : '加载中'}</sg.Pbody>
                </TouchableHighlight>
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
)(AccountReadHistory)

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
