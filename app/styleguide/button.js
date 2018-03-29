import mixin from './mixin.js'
import styled from 'styled-components/native'

export const ButtonDisabled = styled.View`
  padding: ${mixin.padding.nm}px;
  background-color: ${mixin.color.disabled};
  border-radius: ${mixin.radius.nm}px;
`

export default {
  ButtonDisabled
}
