import { REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_POSTS, GET_USERINFO, UPDATE_USERINFO } from '../constants';
import $api from '../../_api'

export function handleREQUEST_POSTS (data) {
  return {
    type: 'REQUEST_POSTS',
    data
  }
}
export function handleRECEIVE_POSTS (data) {
  return {
    type: 'RECEIVE_POSTS',
    data
  }
}
export function handleINVALIDATE_POSTS (data) {
  return {
    type: 'INVALIDATE_POSTS',
    data
  }
}

export function handleGET_USERINFO () {
  return (dispatch) => {
    // 发送前
    dispatch(handleREQUEST_POSTS({}))
    return $api.$fetch('Post', $api.userInfo, {}).then((res) => {
      let curUser = null
      if (res.code === 0) {
        curUser = res.data.curUser
      } else {
        $api.RemoveStorage('Auth')
      }
      dispatch(handleRECEIVE_POSTS(curUser))
    })
  }
}

export function handleUPDATE_USERINFO (data) {
  return {
    type: 'UPDATE_USERINFO',
    data
  }
}
