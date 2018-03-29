import { CHANGE_LOADING, CHANGE_COVER } from '../constants';

export function changeLoading (data) {
  return {
    type: 'CHANGE_LOADING',
    data
  }
}

export function changeCover (data) {
  return {
    type: 'CHANGE_COVER',
    data
  }
}
