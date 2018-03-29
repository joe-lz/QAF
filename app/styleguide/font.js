import mixin from './mixin.js'
import styled from 'styled-components/native'

export const H1 = styled.Text`
  font-size: ${mixin.fs.max};
  font-weight: ${mixin.fw.max};
`
export const H2 = styled.Text`
  font-size: ${mixin.fs.elg};
  font-weight: ${mixin.fw.max};
`
export const H3 = styled.Text`
  font-size: ${mixin.fs.lg};
  font-weight: ${mixin.fw.max};
`
export const Pbody = styled.Text`
  font-size: ${mixin.fs.nm};
  font-weight: ${mixin.fw.nm};
`
export const Pcaption = styled.Text`
  font-size: ${mixin.fs.sm};
  font-weight: ${mixin.fw.nm};
`
export default {
  H1, H2, H3, Pbody, Pcaption
}
