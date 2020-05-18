module.exports = {
  app: 'H3Pay',
  version: '',
  ios: {
    versionName: '0.3.3',
  },
  android: {
    versionName: '0.3.3',
  },
  appID: '1465533145', // 애플 스토어 ID
  packageName: 'com.paypro.h3pay', // 구글 스토어 패키지명
  playstoryURL:
    'https://play.google.com/store/apps/details?id=com.paypro.h3pay', //https://play.google.com/store/apps/details?id=[packageName]
  storeURL: 'https://itunes.apple.com/kr/app/h3pay/id1465533145',
  serverURL: 'http://13.124.55.139:8222',
  storageName: '@H3Pay:',
  deviceId: '',
  deviceName: '',
  SCREENSHOT_DIR: '',
  SCREENSHOT_OPTIONS: {
    timeout: 1000,
    killSignal: 'SIGKILL',
  },
  WEBVIEW: {
    enable: true,
    url: 'http://13.124.55.139:8222/h3pay/auth/login',
    login: {
      uid: '',
      upw: '',
      autoLogin: false,
    },
  },
  isPermission: false,
};
