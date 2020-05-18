import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert,
  AppState,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Linking,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
// import {phonecall} from 'react-native-communications';
// import Geolocation from "@react-native-community/geolocation";
//import RNExitApp from 'react-native-exit-app';
import AndroidOpenSettings from 'react-native-android-open-settings';
// import {Navigation} from 'react-native-navigation';

import WebViewComponent from '../components/webview';
import PermissionComponent from '../components/permission';
import ProgressCircleComponent from '../components/progress/ProgressCircle';
import linkComponent from '../components/link';
import Splash from './Splash';
import envConfig from '../env';
import Helper from '../js/common/Helper';
import Menu from '../menu';

import {changeAppRoot} from '../actions';
import {loadAppVersion} from '../actions/common';
import {
  checkPermissionAsync,
  checkMultiplePermissionAsync,
  requestPermissionAsync,
} from '../js/permission';
// import {push} from '../navigation';

var {width, height} = Dimensions.get('window');
type Props = {};
class WebView extends Component<Props> {
  /* #region LifeCycle */
  constructor(props) {
    super(props);
    let userAgent = DeviceInfo.getUserAgent() + ' APP_PAYPRO_';
    if (Platform.OS == 'ios') userAgent += 'Android';
    else userAgent += 'Android';
    this.state = {
      userAgent: userAgent,
      url: envConfig.WEBVIEW.url,
      statusBar: false,
      webviewMarginTop: 0,
      webviewState: 'IDLE',
      webviewLoaded: false,
      initPermission: false,
      cameraPermission: false,
      locationPermission: false,
      netConnection: false,
      appState: AppState.currentState,
      webviewLoading: false,
      isAlert: false,
      log: '',
      progress: 0.4,
    };
    this.WebViewComponent = null;
    this._checkPermission = this._checkPermission.bind(this);
    this._checkNetConnection = this._checkNetConnection.bind(this);
    this._checkAppVersion = this._checkAppVersion.bind(this);
    this.AppUpdateAlert = this.AppUpdateAlert.bind(this);
    this._permission = this._permission.bind(this);
    this.exitApp = this.exitApp.bind(this);

    this.onSuccess = this.onSuccess.bind(this);
    this.onClose = this.onClose.bind(this);
    this.pushQRScanner = this.pushQRScanner.bind(this);

    this.IntevalTest = this.IntevalTest.bind(this);
    this.sendPermission = this.sendPermission.bind(this);
    this.sendLocation = this.sendLocation.bind(this);
    this.setInitPermission = this.setInitPermission.bind(this);
  }

  componentWillMount() {
    this._checkNetConnection(); //네트워크 상태
    this.props.loadAppVersion();
    this.getInitPermission(); // 최초 권한 페이지 여부
    this._checkPermission(); // 갤러리 권한 여부
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress.bind(this),
    );
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    NetInfo.addEventListener(
      'connectionChange',
      this.handleAppNetConnectionChange.bind(this),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleAppNetConnectionChange,
    );
  }

  componentDidUpdate() {
    this._checkAppVersion();

    if (this.props.appVersion.ver == undefined) {
      //this.interval = setInterval(this.IntevalTest, 1000);
      this.props.loadAppVersion();
    }
  }

  IntevalTest = () => {
    this.props.loadAppVersion();
  };
  /* #endregion */

  /* #region permission */

  getInitPermission = async () => {
    let initPermission = await Helper.getAsyncStorage('initPermission');

    if (initPermission != null) {
      this.setState({initPermission: initPermission, progress: 0.6});
    }
  };

  setInitPermission = async () => {
    const {webview, webviewScript} = this.WebViewComponent;
    var res = await this._permission();

    if (res) {
      //권한 처리 완료 후
      this.setState({initPermission: true});
      if (webview != null) webview.reload();
      Helper.setAsyncStorage('initPermission', 'true');
    }
  };

  _permission = async (type = undefined) => {
    var _permissionMultiple = await checkMultiplePermissionAsync();

    var self = this;
    //카메라 및 위치 권한 체크
    for (var k in _permissionMultiple) {
      var permissionType = k;
      var permissionValue = _permissionMultiple[k];

      //전체 권한 체크가 아닐 경우
      if (type != undefined) {
        if (type != permissionType) continue;
      }

      // 권한 거부(Android) 및 아직 여부를 물어보지 않음 옵션 ==> request
      if (
        (Platform.OS == 'android' && permissionValue == 'denied') ||
        permissionValue == 'undetermined'
      ) {
        permissionValue = await requestPermissionAsync(permissionType);
        const {webview, webviewScript} = this.WebViewComponent;
        _permissionType = permissionType + 'Permission';
        this.setState({
          _permissionType: permissionValue == 'authorized' ? true : false,
        });
        this.sendPermission(permissionType);
        if (permissionValue == 'authorized') {
          if (webview) {
            const {uri} = webview.props.source;
            if (uri.indexOf('mobileMap' != -1)) webview.reload();
          }
        }

        //승인 될 경우 좌표값을 localStorage 에 저장
        if (permissionType.indexOf('location') != -1) {
          if (permissionValue == 'authorized') {
            setTimeout(function() {
              webviewScript.getLocation();
            }, 3000);
            // Geolocation.getCurrentPosition((info) => {
            //   var LAT = info.coords.latitude;
            //   var LNG = info.coords.longitude;
            //   self.sendLocation(LAT, LNG);

            //   setTimeout(function () {
            //     webviewScript.getLocation();
            //   }, 3000);
            // });
          }
        }
      }
      //권한 거부(iOS) 및 다시 물어보지 않음 옵션 ==> confirmAlert
      else if (
        (Platform.OS == 'ios' && permissionValue == 'denied') ||
        permissionValue == 'restricted'
      ) {
        this.PermissionAlert(permissionType);
      }
    }
    return true;
  };

  sendPermission = type => {
    var self = this;
    const {webviewScript, webview} = this.WebViewComponent;
    setTimeout(function() {
      if (webview == undefined) return;
      const {locationPermission, cameraPermission} = self.state;
      var permission = false;
      if (type.indexOf('location') != -1) {
        type = 'location';
        permission = locationPermission;
      } else if (type.indexOf('camera') != -1) {
        type = 'camera';
        permission = cameraPermission;
      }
      webviewScript.setPermission(type, permission);
    }, 500);
  };

  sendLocation = (LAT, LNG) => {
    const {webviewScript, webview} = this.WebViewComponent;
    if (webview == undefined) return;

    webviewScript.setLocation(LAT, LNG);
    /*
    setTimeout(function(){
      webviewScript.getLocation();
    }, 1000);
    */
  };

  /* #endregion */

  /* #region handle */
  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._checkPermission();
    }
    this.setState({appState: nextAppState});
  };

  handleAppNetConnectionChange = connectionInfo => {};

  handleBackPress = state => {
    const {url} = this.state;
    const {webview, webviewScript} = this.WebViewComponent;
    const {root} = this.props;

    let isExitApp = true;
    var self = this;

    // if(root.indexOf('H3Pay.QR') != -1){
    //   Navigation.pop(this.props.componentId);
    //   return true;
    // }

    if (url.indexOf('/h3pay/wallet/myWallet') != -1) isExitApp = false;
    if (isExitApp) webview.goBack();
    if (!isExitApp) {
      if (root != 'H3Pay.WebView') return true;
      Alert.alert(
        '앱을 종료 하시겠습니까?',
        '',
        [
          {
            text: '취소',
            onPress: () => console.log('취소'),
            style: 'cancel',
          },
          {text: '확인', onPress: () => this.exitApp()},
        ],
        {cancelable: false},
      );
    }
    return true;
  };

  exitApp = () => {
    this.props.changeAppRoot(null);
    BackHandler.exitApp();
  };
  /* #endregion */

  /* #region 권한, 네트워크, 버전 체크 */
  _checkPermission = async () => {
    //var _permission = await checkPermissionAsync();
    var _permissionMultiple = await checkMultiplePermissionAsync();
    this.setState({
      cameraPermission:
        _permissionMultiple.camera == 'authorized' ? true : false,
      locationPermission:
        _permissionMultiple.location == 'authorized' ? true : false,
    });

    //카메라 및 위치 권한 체크
    for (var k in _permissionMultiple) this.sendPermission(k);
  };

  _checkNetConnection = () => {
    console.log('netConnection 호출');
    var self = this;

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setTimeout(function() {
          self.setState({netConnection: state.isConnected, progress: 1});
        }, 5000);
      } else {
        Alert.alert(
          '네트워크에 접속할 수 없습니다. 네트워크 연결상태를 확인하세요.',
          '',
          [{text: '확인', onPress: () => this.exitApp()}],
        );
      }
    });
  };

  _checkAppVersion = () => {
    const {appVersion, isUpdateApp} = this.props;
    const {isAlert} = this.state;

    if (appVersion.ver == undefined) return;
    if (isUpdateApp == false) return;
    if (isAlert == true) return;

    this.setState({isAlert: true});
    this.AppUpdateAlert();
  };
  /* #endregion */

  /* #region 버전 업데이트 */
  async AppUpdate() {
    let storeURL = envConfig.storeURL;

    try {
      if (Platform.OS == 'ios') {
        storeURL = await VersionCheck.getStoreUrl({appID: envConfig.appID});
      } else {
        storeURL = await VersionCheck.getPlayStoreUrl({
          packageName: envConfig.packageName,
        });
      }
    } catch (err) {
      storeURL = envConfig.storeURL;
    }

    if (storeURL == null || storeURL == '') storeURL = envConfig.storeURL;

    this.exitApp();
    linkComponent(storeURL);
  }
  /* #endregion */
  /* #region Alert */
  AppUpdateAlert = () => {
    var self = this;
    Alert.alert(
      //'v' + appVersion.ver,
      '앱 이용을 위해서는 업데이트가 필요합니다.',
      '스토어로 이동하시겠습니까?',
      [
        {
          text: '닫기',
          onPress: () => this.exitApp(),
        },
        {
          text: '업데이트',
          onPress: () => {
            self.props.changeAppRoot(null);
            self.AppUpdate();
          },
        },
      ],
      {cancelable: false},
    );
  };

  LogAlert = msg => {
    Alert.alert(
      //'v' + appVersion.ver,
      msg,
      '',
      [
        {
          text: '닫기',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  PermissionAlert = type => {
    var name = '';
    if (type == 'camera') name = '카메라';
    else if (type == 'location') name = '위치';

    var title = name + '에 대한 접근 권한이 없습니다.';
    var subTitle = '설정으로 이동해 ' + name + ' 권한을 허용해 주세요';

    return Alert.alert(
      title,
      subTitle,
      [
        {
          text: '취소',
          // style: 'cancel',
          onPress: () => {
            //console.log("");
          },
        },
        {
          text: '설정',
          onPress: () => {
            Platform.OS == 'ios'
              ? Permissions.openSettings()
              : AndroidOpenSettings.appDetailsSettings();
          },
        },
      ],
      {cancelable: false},
    );
  };
  /* #endregion */

  // confirmPhoneCall = (telno) => {
  //   var telno = telno.replace(/-/gi, "");
  //   Alert.alert(
  //     "",
  //     "가맹점에 전화를 거시겠습니까?",
  //     [
  //       //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //       {
  //         text: "취소",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "전화걸기", onPress: () => phonecall(telno, false) },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  /* #region webview Event */
  _onMessage = event => {
    var self = this;
    let msg;
    try {
      msg = JSON.parse(event.nativeEvent.data);
      console.log('#### message : ', msg);

      var type = msg.type;
      var message = null;
      try {
        message = msg.message;
      } catch (err) {}

      if (type == 'loading') {
        var webviewLoading = true;
        if (message != null) webviewLoading = message;
        self.setState({webviewLoading: webviewLoading});
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };
  _renderError = () => {
    const {webview, webviewScript} = this.WebViewComponent;
    return null;
  };
  _onLoadEnd = webViewState => {
    console.log('_onLoadEnd 호출');
    const {url} = webViewState.nativeEvent;
    const currentUrl = this.state.url;
    const {webview, webviewScript} = this.WebViewComponent;

    if (this.state.webviewLoaded == false) {
      console.log('webviewLoaded');
      this.setState({webviewLoaded: true, progress: 0.8});
    }

    //ksmobile 화면으로 이동 시 로딩바 제거
    if (url.indexOf('ksmobile.inicis.com') != -1) {
      if (this.state.webviewLoading) this.setState({webviewLoading: false});
    }

    if (currentUrl != url) {
      //예외 URL
      if (url.indexOf('tel:') == -1) {
        StatusBar.setHidden(false);
        StatusBar.setBarStyle('dark-content');
        this.setState({url});
      }
    }

    //자동로그인
    if (url.indexOf('auth/login') != -1) {
      if (envConfig.WEBVIEW.login.autoLogin) {
        setTimeout(function() {
          webviewScript.login(envConfig.WEBVIEW.login);
        }, 500);
      }
    }
  };
  _onLoadStart = webViewState => {
    const {webview, webviewScript} = this.WebViewComponent;
  };
  _onNavigationStateChange = webViewState => {
    return;
  };

  _onShouldStartLoadWithRequest = req => {
    console.log('#### _onShouldStartLoadWithRequest : ', req.url);
    var self = this;

    if (req.url.indexOf('h3pay://') != -1) {
      if (req.url.indexOf('calltype=qr_scanner_open') != -1) {
        this.props.navigation.navigate('QR', {
          onSuccess: this.onSuccess,
          onClose: this.onClose,
        });
        return false;
      }
      if (req.url.indexOf('calltype=location') != -1) {
        this._permission('location');
        return false;
      }
    }

    if (req.url.indexOf('mobileMap') != -1) {
      console.log('#### mobile Map page');
      //권한이 true 일 경우
      if (
        this.state.locationPermission == true ||
        this.state.locationPermission == 'true'
      ) {
        // Geolocation.getCurrentPosition((info) => {
        //   var LAT = info.coords.latitude;
        //   var LNG = info.coords.longitude;
        //   self.sendLocation(LAT, LNG);
        // });
      }
    }

    /*
    if (req.url.indexOf('qrcode_value=0xFE3ffb140AD551B392609F03CD5352D1E7A8f8e0') != -1) {
      this.pushQRScanner();
        return false;
    }
    */

    // if (req.url.indexOf(envConfig.serverURL) == -1) {
    //   Linking.openURL(req.url);
    //   return false;
    // }

    return true;
  };

  /* #endregion */

  /* #region qr */
  pushQRScanner = () => {
    var params = {
      onSuccess: this.onSuccess,
      onClose: this.onClose,
    };
    // push(this.props.componentId, 'QR', params);
  };

  onSuccess(e) {
    console.log('this.props.componentId : ', this.props.componentId);
    // Navigation.popToRoot(this.props.componentId);
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
    const {webviewScript, webview} = this.WebViewComponent;

    var count = 0;
    var repeat = setInterval(() => {
      if (webview.state.viewState == 'IDLE') {
        clearInterval(repeat);
        webviewScript.movePayAmountPage(e.data);
      }
      if (count > 50) {
        clearInterval(repeat);
        webview.reload();
      }
      count++;
    }, 100);
  }

  // Back 동작
  onClose = () => {
    console.log('this.props.componentId :' + this.props.componentId);
    // Navigation.pop(this.props.componentId);
    setTimeout(function() {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');
    }, 500);
  };

  /* #endregion */
  render() {
    return (
      <View style={styles.container}>
        <WebViewComponent
          ref={obj => (this.WebViewComponent = obj)}
          url={this.state.url}
          // userAgent={this.state.userAgent}
          // _onLoadStart={this._onLoadStart.bind(this)}
          _onLoadEnd={this._onLoadEnd.bind(this)}
          _renderError={this._renderError.bind(this)}
          _onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          _onMessage={this._onMessage.bind(this)}
          _onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(
            this,
          )}
        />
        {/* {(this.state.webviewLoaded == false ||
          this.state.netConnection == false ||
          this.state.initPermission == false ||
          this.props.appVersion.ver == undefined ||
          this.props.isUpdateApp == true) && (
          <Splash
            containerStyle={styles.splashContainer}
            progress={this.state.progress}
          />
        )}

        {this.state.webviewLoaded == true &&
          this.state.netConnection == true &&
          this.state.initPermission == false &&
          this.props.appVersion.ver != undefined &&
          this.props.isUpdateApp == false && (
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PermissionComponent
                onPress={this.setInitPermission.bind(this)}
              />
            </View>
          )}

        {this.state.webviewLoading == true && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: width,
              height: height,
              backgroundColor: 'rgba(0,0,0, 0.3)',
            }}>
            <ProgressCircleComponent />
          </View>
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: width,
  },
  splashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    appVersion: state.common.appVersion,
    isUpdateApp: state.common.isUpdateApp,
    error: state.common.error,
    root: state.root.root,
  };
};

const mapDispatchToProps = {
  changeAppRoot,
  loadAppVersion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebView);
