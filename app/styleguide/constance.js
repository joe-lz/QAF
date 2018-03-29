import { lighten, darken } from 'polished'
// A. Colours
const color = {
  main: '#1991EB',
  secondary: '#09C199',
  promiment: '#F7981C',
  darkShades: '#333F52',
  icon: '#C5D0DE',
  gradient: {
    from: '#188E9B',
    to: '#6DD7C7'
  },
  // primary: '#1991EB',
  primary: '#3889FF',
  // 'rgba(56, 137, 255, 0.9)',
  success: '#34AA44',
  warning: '#F76B1C',
  danger: '#DC151D',
  info: '#3B4857',
  default: '#F5F7F9',
  disabled: '#E2E7EE',
  bg_color: '#f5f5f5',
  border: '#E5E5E5'
}
// B. Typography
const fc = {
  light: 'white',
  main: '#222',
  secondary: '#333',
  gray: '#666',
  gray_sub: '#999'
}
const fs = {
  max: 26,
  elg: 22,
  lg: 18,
  nm: 14,
  sm: 12
}
const fw = {
  max: '700',
  lg: '500',
  nm: '400',
  sm: '200'
}
// opacity
const opacity = {
  sm: 0.02,
  nm: 0.1
}
// radius
const radius = {
  max: 20,
  lg: 6,
  nm: 4,
  sm: 2
}
const border = '1px solid #F1F4FB'

const padding = {
  max: 60,
  lg: 30,
  nm: 15,
  sm: 10
}
const icon = {
  max: 60,
  lg: 30,
  nm: 24,
  sm: 20,
  mini: 16,
}

export default {
  lighten,
  darken,
  color,
  fc,
  fs,
  fw,
  opacity,
  radius,
  border,
  padding,
  icon
}
