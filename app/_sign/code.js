import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'

import InputCom from '../components/input/input'
import ButtonCom from '../components/button'
import IconCom from '../components/icon'

import mixin from '../styleguide/mixin'
import sg from '../styleguide'
import $api from '../_api'

import { connect } from 'react-redux'
import { changeLoading } from '../redux/actions/globalValue'

import { strings } from '../i18n'
class SignCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      code: ''
    }
  }
  componentWillMount () {
    this.setState({
      mobile: this.props.navigation.state.params.mobile
    })
  }
  componentDidMount () {
  }
  onChange (value) {
    this.setState({
      code: value
    })
    if (value && value.length === 6) {
      this.setState({
        isCode: true
      })
    } else {
      this.setState({
        isCode: false
      })
    }
  }
  onSubmit () {
    this.props.dispatchCHANGE_LOADING(true)
    // 直接判断验证码
    if (this.state.code != this.props.navigation.state.params.sendCode) {
      this.props.dispatchCHANGE_LOADING(false)
      setTimeout(() => {
        Alert.alert('验证码不正确', '', [{
          text: '确认',
          onPress: () => console.log('Cancel Pressed'), style: 'Cancel'
        }], {
          cancelable: false
        })
      }, 500)
      return
    }
    $api.$fetch('Post', $api.signinSms, {
      ...this.state
    }).then((res) => {
      this.props.dispatchCHANGE_LOADING(false)
      if (res.code === 0) {
        $api.SetStorage('Auth', res.data)
        this.props.navigation.navigate('Tab')
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
            <sg.Wrapper style={{...mixin.HeaderRightCom}}>
              <sg.Pcaption style={styles.backTitle}>{strings('titles.sendto')} {this.props.navigation.state.params.mobile}</sg.Pcaption>
            </sg.Wrapper>
          </sg.Wrapper>
          <sg.Wrapper style={styles.bodyWrapper}>
            <sg.H1>{strings('titles.code')}</sg.H1>
            <sg.Wrapper style={styles.formWrapper}>
              <InputCom
                maxLength={6}
                keyboardType={'numeric'}
                onChange={this.onChange.bind(this)}
                value={this.state.code}
                >
              </InputCom>
              <ButtonCom style={styles.btnSubmit} onPress={this.onSubmit.bind(this)} isClick={this.state.isCode} title={strings('buttons.submit')}></ButtonCom>
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
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignCode)

const styles = StyleSheet.create({
  // HeaderLeftCom: {
  //   flex: 1
  // },
  // HeaderRightCom: {
  // },
  bodyWrapper: {
    paddingHorizontal: mixin.padding.nm
  },
  backTitle: {
    paddingRight: mixin.padding.nm,
    lineHeight: 44,
    color: mixin.fc.gray,
    fontSize: mixin.fs.nm
  },
  formWrapper: {
  }
})
