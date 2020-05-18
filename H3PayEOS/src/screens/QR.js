/**
 * Sample React Native App
 *
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Alert,
  AppState,
  BackHandler,
} from 'react-native';
import QRCodeScannerComponent from '../components/qr';
// import {Navigation} from 'react-native-navigation';
import {Magnification, Fonts} from '../styles';
import Permissions from 'react-native-permissions';
import Menu from '../menu';

const {width, height} = Dimensions.get('window');
type Props = {};
export default class QR extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isAlert: false,
      load: false,
    };

    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  permissionCheck = () => {
    Permissions.checkMultiple(['camera']).then(response => {
      if (response.camera == 'denied') {
        this.setState({isAlert: true});
        Alert.alert(
          '카메라에 대한 접근 권한이 없습니다.',
          '설정으로 이동해 카메라 권한을 허용해 주세요',
          [
            {
              text: '취소',
              // style: 'cancel',
              onPress: () => {
                this.setState({isAlert: false});
                // Navigation.pop(this.props.componentId);
              },
            },
            {
              text: '설정',
              onPress: () => {
                this.setState({isAlert: false});
                Permissions.openSettings();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    var self = this;
    setTimeout(function() {
      self.setState({load: true});
      self.permissionCheck();
    }, 300);

    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    // StatusBar.setHidden(true, 'none');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (this.state.isAlert == false) {
        this.permissionCheck();
      }
    }
    this.setState({appState: nextAppState});
  };

  render() {
    const {onSuccess, onClose} = this.props.navigation.state.params;
    let customHeight1 = 28;
    let customHeight2 = 28.5;
    if (Platform.OS == 'ios') {
      customHeight1 = 0;
      customHeight2 = 0;
    }
    return (
      <View style={{flex: 1, width: '100%'}}>
        {Platform.OS == 'ios' && (
          <StatusBar
            hidden={true}
            barStyle="light-content"
            backgroundColor="white"
          />
        )}
        {this.state.load && <QRCodeScannerComponent onSuccess={onSuccess} />}
        <SafeAreaView
          style={{width: '100%', height: '100%', position: 'absolute'}}>
          <SafeAreaView
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SafeAreaView
              style={{
                width: '100%',
                height: (height - width * 0.8) / 2 + customHeight1,
                backgroundColor: 'rgba(0,0,0, 0.9)',
              }}
            />

            <SafeAreaView
              style={{
                width: '100%',
                height: width * 0.8,
                borderColor: 'white',
              }}>
              <View style={{position: 'absolute', top: 0, left: width * 0.1}}>
                <ImageBackground
                  source={require('../images/qr_area.png')}
                  resizeMode="stretch"
                  style={{
                    width: width * 0.8,
                    height: width * 0.8,
                    padding: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderColor: 'rgba(0,0,0, 0.9)',
                      borderWidth: 4,
                      width: '100%',
                      flex: 1,
                    }}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0, 0.9)',
                      height: '1.5%',
                      width: '73%',
                      top: 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0, 0.9)',
                      height: '1.5%',
                      width: '73%',
                      bottom: 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0, 0.9)',
                      height: '73%',
                      width: '1.5%',
                      left: 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0, 0.9)',
                      height: '73%',
                      width: '1.5%',
                      right: 0,
                    }}
                  />

                  {/* <View style={{position : 'absolute', backgroundColor:'rgba(0,0,0, 0.9)', height : 2, width : '13%', top : 0, left:0}} /> */}
                </ImageBackground>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0, 0.9)',
                  width: width * 0.1,
                  height: width * 0.8,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0, 0.9)',
                  width: width * 0.1,
                  height: width * 0.8,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  top: (height * 0.01 * 5 + 46) * -1,
                  left: 0,
                  width: '100%',
                  height: 46,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 46,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 19,
                      fontFamily: Fonts.NR,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    QR코드를
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 19,
                      fontFamily: Fonts.NR,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    사각형안에 맞춰주세요.
                  </Text>
                </View>
              </View>
            </SafeAreaView>

            <SafeAreaView
              style={{
                width: '100%',
                height: (height - width * 0.8) / 2 + customHeight2,
                backgroundColor: 'rgba(0,0,0, 0.9)',
              }}
            />

            <View
              style={{
                position: 'absolute',
                top:
                  width * 0.8 + (height - width * 0.8) / 2 + height * 0.01 * 5,
                left: 0,
                width: '100%',
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 183,
                  height: 46,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: Fonts.NM,
                  }}>
                  QR코드를 스캔해 주세요.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaView>

        <View
          style={{
            width: '100%',
            height: 20,
            backgroundColor: 'rgba(0,0,0, 0.9)',
            position: 'absolute',
            top: -10,
          }}
        />

        <SafeAreaView
          style={{
            width: '100%',
            height: 50,
            position: 'absolute',
            top:
              Magnification() == '3x'
                ? height * 0.01 * 8.5
                : height * 0.01 * 5.3,
            left: 0,
          }}>
          <TouchableOpacity
            style={{
              width: width * 0.01 * 10.67,
              height: width * 0.01 * 10.67,
              marginLeft: width * 0.07,
              position: 'absolute',
            }}
            onPress={
              Platform.OS === 'android'
                ? onClose
                // : () => Navigation.pop(this.props.componentId)
            }>
            <Image
              source={require('../images/btnClose3x.png')}
              style={{
                resizeMode: 'contain',
                width: width * 0.01 * 10.67,
                height: width * 0.01 * 10.67,
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

/*
QR.options = () => ({
    //statusBar: Menu.stack.QR.nav.statusBar,
    topBar: Menu.stack.QR.nav.topBar,
})
*/

const styles = StyleSheet.create({});
