import * as types from './actiontypes';
import CommonApi from '../../api/test/common/common';
import envConfig from '../../env';
import {getAppVersion} from '../../api/common';
import VersionCheck from 'react-native-version-check';
import { Platform } from 'react-native';

export const loadAppVersion = () => {
    return function (dispatch) {
      dispatch({
        type: types.LOAD_APP_VERSION
      })

      return getAppVersion().then(async res => {
        let isUpdateApp = false;
        let currentVersion = getVersion();
        
        //version check
        try{
          var data = await VersionCheck.needUpdate({
            currentVersion: currentVersion,
            latestVersion: res.data.ver
          })
          isUpdateApp = data.isNeeded;
        }catch(err){
        }

        dispatch({
          type: types.LOAD_APP_VERSION_COMPLETED,
          appVersion: res.data,
          isUpdateApp : isUpdateApp
        })
      }).catch(function (error) {
        console.log("#### error : ", error);
        let currentVersion = getVersion();
        const initAppVersion = {ver : currentVersion};
        dispatch({
          type: types.LOAD_APP_VERSION_ERROR,
          error: '관리자에게 문의해주세요',
          appVersion: initAppVersion,
          isUpdateApp : false
        })
      })

      /**
       * TestData
       */
      return CommonApi.getAppVersion().then(async res => {
        let isUpdateApp = false;
        let currentVersion = getVersion();

        try{
          var data = await VersionCheck.needUpdate({
            currentVersion: currentVersion,
            latestVersion: res.ver
          })
          isUpdateApp = data.isNeeded;
        }catch(err){

        }
        dispatch({
          type: types.LOAD_APP_VERSION_COMPLETED,
          appVersion: res,
          isUpdateApp : isUpdateApp
        })
      }).catch(function (error) {
        let currentVersion = getVersion();
        const initAppVersion = {ver : currentVersion};
        dispatch({
          type: types.LOAD_APP_VERSION_ERROR,
          error: '관리자에게 문의해주세요',
          appVersion: initAppVersion,
          isUpdateApp : false
        })
      })

     

  
    }
  }

  getVersion = () => {
    let currentVersion = envConfig.ios.versionName;
    if(Platform.OS == 'android') currentVersion = envConfig.android.versionName;

    return currentVersion;
  }