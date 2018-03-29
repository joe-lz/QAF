import constance from './constance'
import { StyleSheet } from 'react-native'

// css
const Footer = {
  marginTop: constance.padding.lg,
  color: constance.fc.gray_sub,
  textAlign: 'center',
  fontSize: constance.fs.sm
}
const HeaderWrapper = {
  paddingTop: 8,
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  position: 'relative',
  zIndex: 1000,
  height: 60,
  shadowColor: 'rgba(0,0,0,0.1)',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowRadius: constance.radius.nm,
  shadowOpacity: 0.5
}
const HeaderWrapperNoShadow = {
  paddingTop: 8,
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  position: 'relative',
  zIndex: 1000,
  height: 60
}
const HeaderLeftCom = {
  position: 'relative',
  zIndex: 10,
  flex: 1
}
const HeaderMiddleCom = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const HeaderMiddleTitle = {
  width: 280,
  lineHeight: 60,
  textAlign: 'center'
}
const HeaderRightCom = {
  position: 'relative',
  zIndex: 10,
}
const HeaderRightComButton = {
  position: 'relative',
  zIndex: 10,
  paddingTop: 7,
  paddingRight: 5
}
const HeaderRightTitle = {
  paddingRight: constance.padding.nm,
  lineHeight: 44
}
const bodyWrapper = {
  flex: 1
}
const ModalConfirmWrapper = {
  // justifyContent: 'center',
  // alignItems: 'center'
}
const ModalContentWrapper = {
}
const ModalTopWrapper = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: constance.color.border
}
const ModalTopBtnLeft = {
}
const ModalTopTitle = {
  flex: 1,
  textAlign: 'center'
}
const ModalTopBtnRight = {
}
const ModalBodyWrapper = {
}
const ModalBodyInput = {
  padding: constance.padding.nm,
  fontSize: constance.fs.nm,
  height: 50
}
// 单页输入框样式
const InputOne = {
  padding: constance.padding.nm,
  fontSize: constance.fs.nm,
  height: 50
}
// no data style
const ListEmptyComponentTitle = {
  paddingTop: 100,
  textAlign: 'center',
  fontSize: constance.fs.lg,
  fontWeight: constance.fw.max,
  color: constance.fc.gray
}
const ListEmptyComponentTitleNotSign = {
  paddingTop: 100,
  textAlign: 'center',
  fontSize: constance.fs.lg,
  fontWeight: constance.fw.max,
  color: constance.color.primary
}
const AdWrapper = {
  paddingLeft: constance.padding.nm,
  paddingRight: constance.padding.nm,
  marginBottom: constance.padding.nm
}
const AdWrapperContent = {
  paddingTop: constance.padding.sm,
  paddingBottom: constance.padding.sm,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: constance.color.bg_color,
  borderRadius: constance.radius.nm,
  borderWidth: 1,
  borderColor: constance.color.border
}
export default {
  Footer,
  HeaderWrapper,
  HeaderWrapperNoShadow,
  HeaderLeftCom,
  HeaderMiddleCom,
  HeaderMiddleTitle,
  HeaderRightCom,
  HeaderRightComButton,
  HeaderRightTitle,
  bodyWrapper,
  ModalConfirmWrapper,
  ModalContentWrapper,
  ModalTopWrapper,
  ModalTopBtnLeft,
  ModalTopTitle,
  ModalTopBtnRight,
  ModalBodyWrapper,
  ModalBodyInput,
  InputOne,
  ListEmptyComponentTitle,
  ListEmptyComponentTitleNotSign,
  AdWrapper,
  AdWrapperContent
}
