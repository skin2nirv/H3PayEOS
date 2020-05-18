import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

AppRegistry.registerComponent(appName, () => App);

const errorHandler = (e, isFatal) => {
  console.log('#### errorHandle  :', e, isFatal);
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler(errorString => {
  console.log('#### setNativeExceptionHandler : ', errorString);
});
