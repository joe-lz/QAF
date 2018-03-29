import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableHighlight, Alert, Image, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Modal from 'react-native-modalbox'

import IconCom from '../../components/icon'
import HeaderCom from '../../components/header'

import sg from '../../styleguide'
import mixin from '../../styleguide/mixin'
import $api from '../../_api'
import Config from '../../_config'

import Dimensions from 'Dimensions'
const ScreenWidth = Dimensions.get('window').width
const blockWidth = (ScreenWidth-0-6)/3
const blockHeight = blockWidth/(9/9)

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'
import { changeLoading } from '../../redux/actions/globalValue'

import { strings } from '../../i18n'
class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  componentDidMount () {
  }
  componentWillReceiveProps () {
  }
  render() {
    let role = null
    if (this.props.userinfo && this.props.userinfo.role) {
      if (this.props.userinfo.role === 1) {
        role = strings('userinfo.top')
      } else if (this.props.userinfo.role === 0) {
        role = strings('userinfo.bottom')
      } else {
        role = strings('userinfo.versatile')
      }
    }
    let userinfoSignWrapper = null
    if (this.props.userinfo.sign) {
      userinfoSignWrapper = <sg.Wrapper style={styles.userinfoSignWrapper}>
        <sg.Pcaption style={styles.userinfoSign}>{this.props.userinfo.sign}</sg.Pcaption>
      </sg.Wrapper>
    }
    let UserInfo = null
    if (this.props.userinfo && this.props.userinfo._id) {
      UserInfo = <sg.Wrapper style={styles.wrapper}>
        <sg.Wrapper style={styles.avatarWrapper}>
          <Image source={{uri: `${Config.qiniu.root}${this.props.userinfo.avatar}`}}
            style={styles.avatarUrl}>
            </Image>
        </sg.Wrapper>
        <sg.Wrapper style={styles.userinfoWrapper}>
          <sg.H1 style={styles.userinfoUsername}>{$api.YesOrNot(this.props.userinfo.username, strings('titles.stranger'))}</sg.H1>
          <sg.Pcaption style={styles.userinfoBasic}>
            {$api.YesOrNot(this.props.userinfo.height, strings('userinfo.height'), `${this.props.userinfo.height}cm`)}&nbsp;/&nbsp;
            {$api.YesOrNot(this.props.userinfo.weight, strings('userinfo.weight'), `${this.props.userinfo.weight}kg`)}&nbsp;/&nbsp;
            {role}&nbsp;/&nbsp;
            {this.props.userinfo.relationState === 1 ? strings('userinfo.single') : strings('userinfo.inarelationship')}&nbsp;/&nbsp;
            {$api.YesOrNot(this.props.userinfo.birthYear, strings('userinfo.birthYear'), $api.Year2Age(this.props.userinfo.birthYear))}
          </sg.Pcaption>
          {userinfoSignWrapper}
        </sg.Wrapper>
        <sg.Wrapper style={styles.placeHolder}>
        </sg.Wrapper>
      </sg.Wrapper>
    }
    return (
      <sg.Wrapper style={styles.container}>
        {UserInfo}
      </sg.Wrapper>
    )
  }
}
function mapStateToProps (state) {
  return {
    // userinfo: state.userinfo,
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
    minHeight: 300,
  },
  wrapper: {
    position: 'relative',
    zIndex: 100
  },
  placeHolder: {
    marginBottom: mixin.padding.sm,
    height: 10,
    backgroundColor: mixin.color.bg_color
  },
  avatarWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border
  },
  avatarUrl: {
    width: ScreenWidth,
    height: ScreenWidth,
    backgroundColor: mixin.color.bg_color,
  },
  userinfoWrapper: {
    padding: mixin.padding.nm,
    backgroundColor: 'white'
  },
  userinfoUsername: {
  },
  userinfoBasic: {
    paddingTop: 5,
    paddingBottom: 5,
    color: mixin.fc.gray
  },
  userinfoSignWrapper: {
    marginTop: mixin.padding.nm,
    paddingTop: mixin.padding.nm,
    paddingBottom: mixin.padding.nm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: mixin.color.border
  },
  userinfoSign: {
    color: mixin.fc.gray,
  }
})
