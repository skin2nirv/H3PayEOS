import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {Navigation} from 'react-native-navigation';
import * as appActions from './actions';
import {
  registerScreens,
  goToLaunch,
  goToSetup,
  goToWebView,
} from './navigation';
import store from './modules/store';
import envConfig from './env';
import Setup from './screens/Setup';
import {createAppContainer} from 'react-navigation';
import {RootNavigator} from './modules/react-navigation';

//redux setting
//import Menu from './menu.js';

//global.Menu = Menu;
registerScreens(store);
const AppContainer = createAppContainer(RootNavigator);
/*
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
  }
});
*/

let setInitialLayout = envConfig.app + '.Setup';
export default class App extends Component {
  // constructor(props) {
  //   super(props);

  //   if (envConfig.WEBVIEW.enable == true) {
  //     setInitialLayout = envConfig.app + '.WebView';
  //   }
  //   //store.subscribe(this.onStoreUpdate.bind(this));
  //   store.dispatch(appActions.appInitialized(setInitialLayout));
  //   //store.nav = Navigation;

  //   //let persistor = persistStore(store, null, () => { console.log("#### onComplete") });
  //   //this.setState({ persistor: persistor });

  //   this.navigationListener = Navigation.events().registerAppLaunchedListener(
  //     () => {
  //       this.onStoreUpdate();
  //     },
  //   );

  //   // Subscribe
  //   const screenEventListener = Navigation.events().registerComponentDidAppearListener(
  //     ({componentId, componentName}) => {
  //       store.dispatch(appActions.appInitialized(componentName));
  //     },
  //   );
  // }

  // onStoreUpdate() {
  //   let {root} = store.getState().root;
  //   // handle a root change
  //   // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
  //   if (
  //     this.currentRoot != root ||
  //     (this.currentRoot == null && root == null) ||
  //     (this.currentRoot == undefined && root == undefined) ||
  //     (this.currentRoot == '' && root == '')
  //   ) {
  //     this.currentRoot = root;
  //     if (envConfig.WEBVIEW.enable == true) {
  //       return goToWebView();
  //     }
  //     return goToSetup();
  //   }
  // }
  render() {
    return (
      <>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </>
    );
  }
}
