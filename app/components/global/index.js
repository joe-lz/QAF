import React, { Component } from 'react'
import { AppState, StyleSheet, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modalbox'

import mixin from '../../styleguide/mixin'
import sg from '../../styleguide'

import Dimensions from 'Dimensions'
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height
const H = x <= 375 ?  220: 250

import { connect } from 'react-redux'
import { changeLoading, changeCover } from '../../redux/actions/globalValue'

class GlobalCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  componentWillReceiveProps () {
    console.log(this.props.globalValue.isCover, 'this.props.globalValue.isCover')
    if (this.props.globalValue.isCover) {
      this.refs.GlobalModal.open()
    } else {
      this.refs.GlobalModal.close()
    }
  }
  render() {
    return (
      <sg.Wrapper style={styles.Wrapper}>
        <Spinner
          visible={this.props.globalValue.isLoading}
          size='small'
          textStyle={{color: 'white'}}
          overlayColor={'rgba(0,0,0,0.6)'}
        />
        {/* <Spinner
          visible={this.props.globalValue.isCover}
          size='small'
          textStyle={{color: 'white'}}
          overlayColor={'rgba(255,255,255,0.99)'}
        /> */}
        <Modal ref={"GlobalModal"} style={[styles.modal]} coverScreen={true} animationDuration={0}>
          <sg.Wrapper style={{...mixin.ModalContentWrapper}}>
            <Image source={{uri: 'https://ws2.sinaimg.cn/large/006tKfTcgy1fnmbj0huxyj30e80e8dfv.jpg'}} style={styles.imgUrl}>
            </Image>
          </sg.Wrapper>
        </Modal>
      </sg.Wrapper>
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
    dispatchCHANGE_COVER: (data) => dispatch(changeCover(data)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalCom)

const styles = StyleSheet.create({
  modal: {
  },
  imgUrl: {
    width: 100,
    height: 100,
    marginLeft: (x - 100)/2,
    marginTop: 300
  }
})
