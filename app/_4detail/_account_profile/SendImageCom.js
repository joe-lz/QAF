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

import { connect } from 'react-redux'
import { handleGET_USERINFO } from '../../redux/actions/userinfo'
import { changeLoading } from '../../redux/actions/globalValue'

import { strings } from '../../i18n'
class SendImageCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgResponse: {},
      imgSource: '',
      formData: {
        content: '',
        img: ''
      }
    }
  }
  componentWillMount () {
    // 本地是否有access_token
  }
  // 关闭弹窗
  handleuCloseModal (key) {
    Alert.alert(
      strings('titles.giveup'),
      '',
      [
        {text: strings('buttons.yes'), onPress: () => {
          this.refs[`${key}Modal`].close()
        }},
        {text: strings('buttons.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
  handleuOpenModal (key) {
    this.refs[`${key}Modal`].open()
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
        this.handleuOpenModal('SendImage')
        let source = { uri: response.uri }
        this.setState({
          imgResponse: response,
          imgSource: source
        })
      }
    })
  }
  onChange (value) {
    let valueObj = {}
    valueObj.content = value
    let newFormData = Object.assign({}, this.state.formData, valueObj)
    this.setState({
      formData: newFormData
    })
  }
  handleuSubmit () {
    this.refs.SendImageModal.close()
    setTimeout(() => {
      this.props.dispatchCHANGE_LOADING(true)
    }, 500)
    // 上传图片
    $api.UploadImage(this.state.imgResponse, 'post').then((res) => {
      // 成功
      let valueObj = {}
      valueObj.img = res
      let newFormData = Object.assign({}, this.state.formData, valueObj)
      this.setState({
        formData: newFormData
      })
      this.handleuPost()
    }).catch((err) => {
      // 失败
      // this.props.dispatchCHANGE_LOADING(false)
      this.props.onResult(strings('buttons.failed'))
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
  handleuPost () {
    // 发布post
    // this.props.dispatchCHANGE_LOADING(false)
    this.props.onResult(strings('buttons.success'))
    $api.$fetch('Post', $api.userpostAdd, this.state.formData).then((res) => {
      if (res.code === 0) {
        this.refs.toast.show(strings('buttons.success'))
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
    return (
      <sg.Wrapper style={styles.container}>
        <sg.Wrapper style={styles.SendImageComWrapper}>
          <TouchableHighlight
            onPress={() => this.handleImagePicker()}
            underlayColor={'transparent'}>
            <sg.Wrapper style={styles.SendImageCom}>
              <sg.Wrapper style={styles.SendImageIconWrapper}>
                <IconCom
                  type='MD'
                  name='share'
                  size={mixin.icon.mini}
                  color={'white'}></IconCom>
                </sg.Wrapper>
                <sg.Pcaption style={styles.SendImageTitle}>{strings('buttons.sendImage')}</sg.Pcaption>
            </sg.Wrapper>
          </TouchableHighlight>
        </sg.Wrapper>
        <Modal ref={"SendImageModal"}
          style={[styles.modal]}
          position={"bottom"}
          coverScreen={true}
          swipeToClose={false}>
          <sg.SafeArea style={styles.safeArea}>
            <HeaderCom
              icon='window-close'
              iconType='MD'
              title={strings('buttons.sendImage')}
              btnTitle={strings('buttons.save')}
              navigation={this.props.navigation}
              onIconPress={this.handleuCloseModal.bind(this, 'SendImage')}
              onPress={this.handleuSubmit.bind(this)}>
            </HeaderCom>
            <sg.Wrapper style={styles.bodyWrapper}>
              <TextInput
                maxLength={140}
                autoFocus
                multiline={true}
                placeholder={strings('buttons.enter')}
                value={this.state.formData.content}
                style={styles.TextInput}
                onChangeText={(value) => this.onChange(value)}>
              </TextInput>
              <sg.Wrapper style={styles.BottomWrapper}>
                <Image source={this.state.imgSource} style={styles.imgUrl}>
                </Image>
              </sg.Wrapper>
            </sg.Wrapper>
          </sg.SafeArea>
        </Modal>
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
    dispatchCHANGE_LOADING: (data) => dispatch(changeLoading(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendImageCom)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    width: '100%'
  },
  bodyWrapper: {
  },
  TextInput: {
    padding: mixin.padding.nm,
    paddingTop: mixin.padding.lg,
    paddingBottom: mixin.padding.lg,
    marginBottom: mixin.padding.nm,
    height: 140,
    fontSize: mixin.fs.nm,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: mixin.radius.nm,
    shadowOpacity: 0.5
  },
  BottomWrapper: {
    padding: mixin.padding.nm,
  },
  SendImageComWrapper: {
    position: 'absolute',
    zIndex: 100,
    bottom: 30,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  SendImageCom: {
    position: 'relative',
    paddingLeft: mixin.padding.nm,
    paddingRight: mixin.padding.nm,
    borderRadius: 22,
    backgroundColor: 'rgba(56, 137, 255, 0.9)',
  },
  SendImageIconWrapper: {
    position: 'absolute',
    left: 0,
    top: -3
  },
  SendImageTitle: {
    marginLeft: 20,
    color: 'white',
    lineHeight: 35,
    fontSize: mixin.fs.nm
  },
  imgUrl: {
    width: 100,
    height: 100
  }
})
