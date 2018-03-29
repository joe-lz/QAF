import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import sg from '../styleguide'
import mixin from '../styleguide/mixin'
import $api from '../_api'

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../redux/actions/userinfo'

class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    // 本地是否有access_token
    $api.GetStorage('Auth').then(res => {
      if (!res) {
        // 没有
        // this.props.navigation.navigate('Sign')
      } else {
        this.props.dispatchGET_USERINFO()
        // 有
      }
    })
  }
  render() {
    return (
      <sg.Wrapper style={styles.container}>
        {/* <sg.H1 style={styles.type}>UserInfo</sg.H1> */}
        {/* <sg.H3>{String(this.props.globalValue.isCover)}</sg.H3> */}
      </sg.Wrapper>
    )
  }
}
function mapStateToProps (state) {
  return {
    userinfo: state.userinfo,
    globalValue: state.globalValue
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
)(UserInfo)

const styles = StyleSheet.create({
  container: {
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm
  }
})
