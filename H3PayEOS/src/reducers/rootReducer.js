import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';
import { Alert } from 'react-native';
const initialState = Immutable({
  root: 'Home'
});

//root reducer
export function root(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root
      });
    default:
      return state;
  }
}


