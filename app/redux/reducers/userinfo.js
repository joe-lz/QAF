import { GET_USERINFO, UPDATE_USERINFO } from '../constants';

const initialState = null

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_POSTS':
      return state
    case 'RECEIVE_POSTS':
      return action.data
    case 'INVALIDATE_POSTS':
      return state
    default:
      return state
  }
}

export default userinfo
