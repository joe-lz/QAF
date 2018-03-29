import { INCREASE, DECREASE } from '../constants';

export function handleINCREASE (data) {
  return {
    type: 'INCREASE',
    data,
  };
}

export function handleDECREASE (data) {
  return {
    type: 'DECREASE',
    data,
  };
}
