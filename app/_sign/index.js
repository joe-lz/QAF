import React, { Component } from 'react'
import { StyleSheet, Keyboard, Alert } from 'react-native'

import InputCom from '../components/input/input'
import ButtonCom from '../components/button'
import IconCom from '../components/icon'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import { connect } from 'react-redux'
import { changeLoading, changeCover } from '../redux/actions/globalValue'

import { strings } from '../i18n'
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      isPhone: false
    }
  }
  componentWillMount () {
    // this.props.dispatchCHANGE_LOADING(false)
    // this.props.dispatchCHANGE_COVER(false)
  }
  componentDidMount () {
  }
  onChange (value) {
    this.setState({
      mobile: value
    })
    if ($api.isPhone(value)) {
      this.setState({
        isPhone: true
      })
    } else {
      this.setState({
        isPhone: false
      })
    }
  }
  onSubmit () {
    // 键盘收起
    Keyboard.dismiss()
    // 显示Loading
    this.props.dispatchCHANGE_LOADING(true)
    $api.$fetch('Post', $api.signinSendSms, {
      mobile: this.state.mobile
    }).then((res) => {
      // 隐藏Loading
      console.log(res)
      this.props.dispatchCHANGE_LOADING(false)
      if (res.code === 0) {
        this.props.navigation.navigate('SignCode', {
          mobile: this.state.mobile,
          sendCode: res.data.sendCode
        })
      } else {
        setTimeout(() => {
          Alert.alert(res.msg, '', [{
            text: '确认',
            onPress: () => console.log('Cancel Pressed'), style: 'Cancel'
          }], {
            cancelable: false
          })
        }, 500)
      }
    }).catch((err) => {
      // 隐藏Loading
      this.props.dispatchCHANGE_LOADING(false)
    })
  }
  render() {
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper style={styles.OneWrapper}>
          <sg.Wrapper style={{...mixin.HeaderWrapperNoShadow}}>
            <sg.Wrapper style={{...mixin.HeaderLeftCom}}>
              <IconCom name='angle-left' onPress={this.props.navigation.goBack.bind(this)}></IconCom>
            </sg.Wrapper>
          </sg.Wrapper>
          <sg.Wrapper style={styles.bodyWrapper}>
            <sg.H1>{strings('titles.signWithPhone')}</sg.H1>
            <sg.Wrapper style={styles.formWrapper}>
              <InputCom
                maxLength={11}
                keyboardType={'numeric'}
                onChange={this.onChange.bind(this)}
                value={this.state.mobile}
                >
              </InputCom>
              <ButtonCom style={styles.btnSubmit} onPress={this.onSubmit.bind(this)} isClick={this.state.isPhone} title={strings('titles.sendCode')}></ButtonCom>
            </sg.Wrapper>
          </sg.Wrapper>
        </sg.OneWrapper>
      </sg.SafeArea>
    )
  }
}

function mapStateToProps (state) {
  return {
    globalValue: state.globalValue
  }
}
function mapDispatchToProps (dispatch) {
  return {
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data)),
    dispatchCHANGE_COVER: (data) => dispatch(changeCover(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sign)

const styles = StyleSheet.create({
  bodyWrapper: {
    // paddingTop: 60,
    paddingHorizontal: mixin.padding.nm
  },
  formWrapper: {
  }
})
