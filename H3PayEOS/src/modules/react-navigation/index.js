import * as React from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import QR from '../../screens/QR';
import Setup from '../../screens/Setup';
import Splash from '../../screens/Splash';
import WebView from '../../screens/WebView';

const {width} = Dimensions.get('window');

const RootNavigator = createStackNavigator(
  {
    QR: {
      screen: QR,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    Splash: {
      screen: Splash,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    WebView: {
      screen: WebView,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    Setup: {
      screen: Setup,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
  },
  {
    initialRouteName: 'WebView',
    headerMode: 'none',
    header: () => null,
    headerLayoutPreset: 'center',
  },
);

export {RootNavigator};
