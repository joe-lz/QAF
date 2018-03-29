import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, View, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'

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
class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let wrapper = null
    if (!this.props.userinfo) {
      wrapper = <TouchableHighlight
        style={styles.touchArea}
        underlayColor='transparent'
        onPress={() => {navigate('Sign')}}>
        <sg.H1 style={styles.username}>{strings('titles.signin')}</sg.H1>
      </TouchableHighlight>
    } else {
      // wrapper = <sg.Wrapper>
      //   <sg.Wrapper style={styles.RightContainer}>
      //     {/* <sg.Wrapper style={styles.avatar}></sg.Wrapper> */}
      //     <sg.H1 style={styles.username}>{this.props.userinfo.username}</sg.H1>
      //   </sg.Wrapper>
      // </sg.Wrapper>
      wrapper = <TouchableHighlight
        style={styles.touchArea}
        underlayColor='transparent'
        onPress={() => {
          navigate('AccountProfile', {
            userId: this.props.userinfo._id
          })
        }}>
        <sg.Wrapper style={styles.RightContainer}>
          <sg.H1 style={styles.username}>{strings('titles.hi')}{$api.YesOrNot(this.props.userinfo.username, strings('titles.stranger'))}</sg.H1>
          <sg.Wrapper style={styles.avatar}>
            <Image source={{uri: `${Config.qiniu.root}${this.props.userinfo.avatar}`}}
            style={styles.itemAvatar}>
            </Image>
          </sg.Wrapper>
          {/* {this.props.userinfo.username?this.props.userinfo.username:strings('titles.stranger')} */}
        </sg.Wrapper>
      </TouchableHighlight>
    }
    return (
      <sg.Wrapper style={styles.container}>
        {wrapper}
      </sg.Wrapper>
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
)(UserInfo)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
    height: mixin.padding.lg * 2 + 30,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: mixin.radius.nm,
    shadowOpacity: 0.5
  },
  touchArea: {
    flex: 1,
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.lg,
    paddingBottom: mixin.padding.lg,
  },
  itemAvatar: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: mixin.color.bg_color,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border,
  },
  RightContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    height: '100%'
  },
  username: {
    flex: 1,
    lineHeight: 30
  }
})
