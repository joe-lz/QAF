import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Button, TextInput, Picker, Alert } from 'react-native'
import Modal from 'react-native-modalbox'
import ImagePicker from 'react-native-image-picker'

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
import { changeLoading } from '../../redux/actions/globalValue'

import { strings } from '../../i18n'
class AccountSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {
        mobile: ''
      }
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
  handleSelect (key, value) {
    if (key === 'role') {
      value = Number(value)
    }
    // state赋值
    let valueObj = {}
    valueObj[key] = value
    let newFormData = Object.assign({}, this.state.formData, valueObj)
    this.setState({
      formData: newFormData
    })
  }
  // 关闭弹窗
  handleuCloseModal (key) {
    this.refs[`${key}Modal`].close()
  }
  handleuOpenModal (key) {
    this.refs[`${key}Modal`].open()
  }
  // 更新
  handleuUpdate (key) {
    $api.$fetch('Put', $api.userInfo, this.state.formData).then((res) => {
      if (res.code === 0) {
        this.props.dispatchGET_USERINFO()
        if (key) { this.handleuCloseModal(key) }
      } else {
        setTimeout(() => {
          Alert.alert(strings('buttons.failed'), '', [{
            text: strings('buttons.ok'),
            onPress: () => console.log('Cancel Pressed'), style: 'Cancel'
          }], {
            cancelable: false
          })
        }, 500)
      }
    })
  }
  handleImagePicker () {
    var options = {
      title: '',
      cancelButtonTitle: strings('buttons.cancel'),
      takePhotoButtonTitle: strings('buttons.TakePhoto'),
      chooseFromLibraryButtonTitle: strings('buttons.ChooseFromLibrary'),
      // customButtons: [
      //   {name: 'viewImage', title: strings('buttons.ViewPicture')},
      // ],
      quality: 0.7,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let source = { uri: response.uri }
        // this.setState({
        //   avatarSource: source
        // })
        this.props.dispatchCHANGE_LOADING(true)
        $api.UploadImage(response, 'avatar').then((res) => {
          // 成功
          let valueObj = {}
          valueObj.avatar = res
          let newFormData = Object.assign({}, this.state.formData, valueObj)
          this.setState({
            formData: newFormData
          })
          this.handleuUpdate()
          this.props.dispatchCHANGE_LOADING(false)
        }).catch((err) => {
          // 失败
          this.props.dispatchCHANGE_LOADING(false)
          setTimeout(() => {
            Alert.alert(strings('buttons.failed'), '', [{
              text: '确认',
              onPress: () => console.log('Cancel Pressed'), style: 'Cancel'
            }], {
              cancelable: false
            })
          }, 500)
        })
      }
    })
  }
  handleSignout () {
    Alert.alert(
      strings('titles.signoutTitle'),
      '',
      [
        {text: strings('buttons.yes'), onPress: () => {
          $api.RemoveStorage('Auth')
          this.props.dispatchGET_USERINFO()
          this.props.navigation.navigate('Tab')
        }},
        {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  render() {
    const {navigate, goBack, state} = this.props.navigation
    let ScrollViewCom = null
    let role = null
    if (this.props.userinfo) {
      if (this.props.userinfo.role === 1) {
        role = strings('userinfo.top')
      } else if (this.props.userinfo.role === 0) {
        role = strings('userinfo.bottom')
      } else {
        role = strings('userinfo.versatile')
      }
    }
    if (this.props.userinfo && this.props.userinfo._id) {
      ScrollViewCom = <ScrollView>
        <sg.Wrapper style={{...mixin.bodyWrapper}}>
          <sg.Wrapper style={styles.menuListsWrapper}>
            <ListItemCom
              leftTitle={strings('userinfo.avatar')}
              rightImage={this.props.userinfo.avatar}
              onPress={() => {
                this.handleImagePicker()
              }}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.mobile')}
              rightTitle={this.props.userinfo.mobile}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.username')}
              rightTitle={this.props.userinfo.username}
              onPress={() => navigate('AccountSettingDetail', {page: 'username', maxLength: 8})}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.sign')}
              rightTitle={this.props.userinfo.sign}
              onPress={() => navigate('AccountSettingDetail', {page: 'sign', maxLength: 140, multiline: true})}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.role')}
              rightTitle={role}
              onPress={() => this.handleuOpenModal('role')}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.relationState')}
              rightTitle={this.props.userinfo.relationState === 1 ? strings('userinfo.single') : strings('userinfo.inarelationship')}
              onPress={() => this.handleuOpenModal('relationState')}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.weight')}
              rightTitle={this.props.userinfo.height ? `${this.props.userinfo.weight}kg` : ''}
              onPress={() => this.handleuOpenModal('weight')}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.height')}
              rightTitle={this.props.userinfo.height ? `${this.props.userinfo.height}cm` : ''}
              onPress={() => this.handleuOpenModal('height')}></ListItemCom>
            <ListItemCom
              leftTitle={strings('userinfo.birthYear')}
              rightTitle={this.props.userinfo.birthYear ? `${$api.Year2Age(this.props.userinfo.birthYear)}` : ''}
              onPress={() => this.handleuOpenModal('birthYear')}></ListItemCom>
          </sg.Wrapper>
        </sg.Wrapper>
        <Modal ref={"roleModal"} style={[styles.modal]} position={"bottom"} coverScreen={true}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <sg.Wrapper style={{...mixin.ModalTopWrapper}}>
              <Button onPress={() => this.handleuCloseModal('role')} title={strings('buttons.cancel')} color={mixin.fc.gray} accessibilityLabel="cancel"/>
              <sg.Pbody style={{...mixin.ModalTopTitle}}></sg.Pbody>
              <Button onPress={() => {
                this.handleuUpdate('role')
              }} title={strings('buttons.submit')} color={mixin.color.primary} accessibilityLabel="confirm"/>
            </sg.Wrapper>
            <sg.Wrapper style={styles.ModalBodyWrapper}>
              <Picker
                selectedValue={String(this.state.formData.role)}
                onValueChange={(value) => {
                  this.handleSelect('role', value)
                }}>
                <Picker.Item label={strings('userinfo.top')} value="1" />
                <Picker.Item label={strings('userinfo.versatile')} value="0.5" />
                <Picker.Item label={strings('userinfo.bottom')} value="0" />
              </Picker>
            </sg.Wrapper>
          </sg.Wrapper>
        </Modal>
        <Modal ref={"relationStateModal"} style={[styles.modal]} position={"bottom"} coverScreen={true}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <sg.Wrapper style={{...mixin.ModalTopWrapper}}>
              <Button onPress={() => this.handleuCloseModal('relationState')} title={strings('buttons.cancel')} color={mixin.fc.gray} accessibilityLabel="cancel"/>
              <sg.Pbody style={{...mixin.ModalTopTitle}}></sg.Pbody>
              <Button onPress={() => {
                this.handleuUpdate('relationState')
              }} title={strings('buttons.submit')} color={mixin.color.primary} accessibilityLabel="confirm"/>
            </sg.Wrapper>
            <sg.Wrapper style={styles.ModalBodyWrapper}>
              <Picker
                selectedValue={String(this.state.formData.relationState)}
                onValueChange={(value) => {
                  this.handleSelect('relationState', value)
                }}>
                <Picker.Item label={strings('userinfo.single')} value="1" />
                <Picker.Item label={strings('userinfo.inarelationship')} value="2" />
              </Picker>
            </sg.Wrapper>
          </sg.Wrapper>
        </Modal>
        <Modal ref={"weightModal"} style={[styles.modal]} position={"bottom"} coverScreen={true}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <sg.Wrapper style={{...mixin.ModalTopWrapper}}>
              <Button onPress={() => this.handleuCloseModal('weight')} title={strings('buttons.cancel')} color={mixin.fc.gray} accessibilityLabel="cancel"/>
              <sg.Pbody style={{...mixin.ModalTopTitle}}></sg.Pbody>
              <Button onPress={() => {
                this.handleuUpdate('weight')
              }} title={strings('buttons.submit')} color={mixin.color.primary} accessibilityLabel="confirm"/>
            </sg.Wrapper>
            <sg.Wrapper style={styles.ModalBodyWrapper}>
              <Picker
                selectedValue={String(this.state.formData.weight)}
                onValueChange={(value) => {
                  this.handleSelect('weight', value)
                }}>
                {
                  $api.ArrayRange(40, 100).map((item) => {
                    return <Picker.Item label={String(item)} value={String(item)} />
                  })
                }
              </Picker>
            </sg.Wrapper>
          </sg.Wrapper>
        </Modal>
        <Modal ref={"heightModal"} style={[styles.modal]} position={"bottom"} coverScreen={true}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <sg.Wrapper style={{...mixin.ModalTopWrapper}}>
              <Button onPress={() => this.handleuCloseModal('height')} title={strings('buttons.cancel')} color={mixin.fc.gray} accessibilityLabel="cancel"/>
              <sg.Pbody style={{...mixin.ModalTopTitle}}></sg.Pbody>
              <Button onPress={() => {
                this.handleuUpdate('height')
              }} title={strings('buttons.submit')} color={mixin.color.primary} accessibilityLabel="confirm"/>
            </sg.Wrapper>
            <sg.Wrapper style={styles.ModalBodyWrapper}>
              <Picker
                selectedValue={String(this.state.formData.height)}
                onValueChange={(value) => {
                  this.handleSelect('height', value)
                }}>
                {
                  $api.ArrayRange(120, 220).map((item) => {
                    return <Picker.Item label={String(item)} value={String(item)} />
                  })
                }
              </Picker>
            </sg.Wrapper>
          </sg.Wrapper>
        </Modal>
        <Modal ref={"birthYearModal"} style={[styles.modal]} position={"bottom"} coverScreen={true}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <sg.Wrapper style={{...mixin.ModalTopWrapper}}>
              <Button onPress={() => this.handleuCloseModal('birthYear')} title={strings('buttons.cancel')} color={mixin.fc.gray} accessibilityLabel="cancel"/>
              <sg.Pbody style={{...mixin.ModalTopTitle}}></sg.Pbody>
              <Button onPress={() => {
                this.handleuUpdate('birthYear')
              }} title={strings('buttons.submit')} color={mixin.color.primary} accessibilityLabel="confirm"/>
            </sg.Wrapper>
            <sg.Wrapper style={styles.ModalBodyWrapper}>
              <Picker
                selectedValue={String(this.state.formData.birthYear)}
                onValueChange={(value) => {
                  this.handleSelect('birthYear', value)
                }}>
                {
                  $api.ArrayRange((new Date()).getFullYear()-100, (new Date()).getFullYear()-10).map((item) => {
                    return <Picker.Item label={String(item)} value={String(item)} />
                  })
                }
              </Picker>
            </sg.Wrapper>
          </sg.Wrapper>
        </Modal>
      </ScrollView>
    }
    return (
      <sg.SafeArea style={styles.safeArea}>
        <sg.OneWrapper>
          <HeaderCom
            title={strings('buttons.accountSetting')}
            btnTitle={strings('titles.signout')}
            navigation={this.props.navigation}
            onPress={this.handleSignout.bind(this)}>
          </HeaderCom>
          {ScrollViewCom}
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
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSetting)

const styles = StyleSheet.create({
  menuListsWrapper: {
  },
  modal: {
    ...mixin.ModalConfirmWrapper,
    height: 300
  }
})
