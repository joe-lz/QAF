import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, TextInput } from 'react-native'

import IconCom from '../../components/icon'
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
import { changeLoading } from '../../redux/actions/globalValue'

import { strings } from '../../i18n'
class AccountSettingDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
  }
  componentWillMount () {
    // 设置默认值
    this.setState({
      formData: {
        ...this.props.userinfo
      }
    })
  }
  onChange (value) {
    let params = this.props.navigation.state.params
    let valueObj = {}
    valueObj[params.page] = value
    let newFormData = Object.assign({}, this.state.formData, valueObj)
    this.setState({
      formData: newFormData
    })
  }
  handleuUpdate () {
    // this.props.dispatchCHANGE_LOADING(true)
    $api.$fetch('Put', $api.userInfo, this.state.formData).then((res) => {
      // this.props.dispatchCHANGE_LOADING(false)
      if (res.code === 0) {
        this.props.dispatchGET_USERINFO()
        this.props.navigation.goBack()
      } else {
        setTimeout(() => {
          Alert.alert(strings('buttons.failed'), '', [{
            text: '确认',
            onPress: () => console.log('Cancel Pressed'), style: 'Cancel'
          }], {
            cancelable: false
          })
        }, 500)
      }
    })
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let HeaderTitle = null
    let params = this.props.navigation.state.params
    // let page = this.props.navigation.state.params.page
    HeaderTitle = strings(`userinfo.${params.page}`)
    // if (params.page === 'username') {
    //   HeaderTitle = {strings('userinfo.username')}
    // } else if (params.page === 'sign') {
    //   HeaderTitle = {strings('userinfo.sign')}
    // }
    return (
      <sg.SafeArea style={styles.safeArea}>
        <HeaderCom
          title={HeaderTitle}
          btnTitle={strings('buttons.save')}
          navigation={this.props.navigation}
          onPress={this.handleuUpdate.bind(this)}>
        </HeaderCom>
        <sg.Wrapper style={styles.bodyWrapper}>
          <TextInput
            maxLength={params.maxLength ? params.maxLength : 14}
            autoFocus
            multiline={params.multiline ? true : false}
            placeholder={strings('buttons.enter')}
            value={this.state.formData[params.page]}
            style={{...mixin.InputOne, height: params.multiline ? 150 : 50}}
            onChangeText={(value) => this.onChange(value)}>
          </TextInput>
        </sg.Wrapper>
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
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSettingDetail)

const styles = StyleSheet.create({
  bodyWrapper: {
    ...mixin.bodyWrapper,
    paddingTop: mixin.padding.nm
  }
})
