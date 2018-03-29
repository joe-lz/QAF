import { INCREASE, DECREASE } from '../constants';

const initialState = 0

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    default:
      return state
  }
}

export default counter
