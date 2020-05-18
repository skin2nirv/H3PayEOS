import {getAppVersion} from './testData';

export default CommonApi = {
    /**
     *  App Version 가지고 온다.
     */
    getAppVersion : function(){
        return new Promise( (resolve, reject) => {
            var appVersion = getAppVersion();
            resolve(appVersion);
        })
    },
}

