
import { combineReducers } from 'redux';
import { root } from './rootReducer';

const initialAuthState = {
  isLoggedIn: false,
};

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'LOGIN_COMPLETED':
      return { ...state, isLoggedIn: true };
    case 'LOGIN_ERROR':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const initialAppVersionState = {
  appVersion : {"ver": undefined},
  isUpdateApp : false,
  fetchingUpdate: false,
  error : undefined,
};

function common(state = initialAppVersionState, action) {
  switch (action.type) {
    case 'LOAD_APP_VERSION':
      return { ...state, fetchingUpdate: true };
    case 'LOAD_APP_VERSION_COMPLETED':
      return { ...state, fetchingUpdate: false, appVersion : action.appVersion, isUpdateApp : action.isUpdateApp };
    case 'LOAD_APP_VERSION_ERROR':
      return { ...state, fetchingUpdate: false, error : action.error };
    default:
      return state;
  }
}

export default combineReducers({
  root,
  auth,
  common
});