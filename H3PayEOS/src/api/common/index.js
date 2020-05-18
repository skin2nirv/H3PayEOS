import axios from 'axios';
import envConfig from '../../env';
import {Platform } from 'react-native'; 

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

export const getAppVersion = (state) => {
  let url = envConfig.serverURL + '/h3pay/ios/version';
  if(Platform.OS == 'android') url = envConfig.serverURL + '/h3pay/version';
  return axios.get(url);
}


