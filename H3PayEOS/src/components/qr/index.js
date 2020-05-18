/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  NavigatorIOS,
  Text,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { Navigation } from 'react-native-navigation';

var {width, height} = Dimensions.get('window');
type Props = {};
export default class QRCodeScannerComponent extends Component<Props> {
  render() {
    return (
      <QRCodeScanner
        onRead={this.props.onSuccess}
        cameraStyle={{backgroundColor: 'red', width: width, height: '100%'}}
      />
    );

    // return (
    //   <Navigation
    //     initialRoute={{
    //       component: QRCodeScanner,
    //       title : 'qr',
    //       navigationBarHidden : true,
    //       passProps: {
    //         onRead: this.props.onSuccess,
    //         cameraStyle: styles.cameraContainer,
    //         topViewStyle: styles.zeroContainer,
    //         bottomViewStyle: styles.zeroContainer,
    //       }
    //     }}
    //     style={{flex: 1, padding : 0, margin : 0}}
    //   />
    // );

    return (
      <NavigatorIOS
        initialRoute={{
          component: QRCodeScanner,
          title: 'qr',
          navigationBarHidden: true,
          passProps: {
            onRead: this.props.onSuccess,
            cameraStyle: styles.cameraContainer,
            topViewStyle: styles.zeroContainer,
            bottomViewStyle: styles.zeroContainer,
          },
        }}
        style={{flex: 1, padding: 0, margin: 0}}
      />
    );
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0,
    margin: 0,
    padding: 0,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
    margin: 0,
    padding: 0,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
