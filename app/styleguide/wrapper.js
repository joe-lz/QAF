import mixin from './mixin.js'
import styled from 'styled-components/native'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'

export const SafeArea = styled(SafeAreaView)`
  background: white;
  min-height: 100%;
`
export const OneWrapper = styled.View`
  width: 100%;
  height: 100%;
  background: white;
`
export const Wrapper = styled.View`
`
export const Loading = styled.ActivityIndicator`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  margin-left: -40px;
  margin-top: -40px;
  width: 80px;
  height: 80px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 6px;
  border-width: ${StyleSheet.hairlineWidth};
  border-color: ${mixin.fc.secondary};
`
{/* <sg.Loading
  animating={true}
  style={[{display: this.state.isLoading ? 'flex' : 'none'}]}
  size="small"
  color={'white'}>
</sg.Loading> */}

export default {
  SafeArea, OneWrapper, Wrapper, Loading
}
