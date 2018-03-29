import { CHANGE_LOADING, CHANGE_COVER } from '../constants';

const initialState = {
  isLoading: false,
  isCover: false
}

const globalValue = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING':
      newState = Object.assign({}, state, {
        isLoading: action.data
      })
      return newState
    case 'CHANGE_COVER':
      newState = Object.assign({}, state, {
        isCover: action.data
      })
      return newState
    default:
      return state
  }
}

export default globalValue
