import { registerScreen, registerScreenWithRedux, setRoot, _push } from './modules/navigation'
import envConfig from './env';
import Splash from './screens/Splash';
import Setup from './screens/Setup';
import WebView from './screens/WebView';
import QR from './screens/QR';


export const registerScreens = (store) => {
  registerScreen(envConfig.app + '.Splash', Splash);

  registerScreen(envConfig.app + '.QR', QR);
  registerScreenWithRedux(envConfig.app + '.Setup', Setup, store);
  registerScreenWithRedux(envConfig.app + '.WebView', WebView, store);
}

export const push = (componentId, componentName, props = {}, title = "", subTitle = "") => {
  switch (componentName) {
    case 'Test':
      _push(componentId, {
        component: {
          name: envConfig.app + '.Setting',
          passProps: {
            passProps: props
          },
          options: {
            topBar: Menu.stack.Setting.nav.topBar,
            statusBar: Menu.stack.Setting.nav.statusBar
          }
        }
      });
      break;

    case 'QR':
      _push(componentId, {
        component: {
          name: envConfig.app +'.QR',
          passProps: {
            passProps: props
          },
          options: {
            topBar: {
              visible: false,
              drawBehind: true,
              animate: true,
            },
            statusBar: {
              visible: false,
              style: 'dark',
              backgroundColor: 'white',
            }
          }
        }
      });
      break;

    default:

  }

}

export const goToSetup = () =>
  setRoot('stack', envConfig.app + '.Setup', [
    {
      component: {
        name: envConfig.app + '.Setup',
      },
    },
  ])
export const goToLogin = () =>
  setRoot('stack', envConfig.app + '.Login', [
    {
      component: {
        name: envConfig.app + '.Login',
      },
    },
  ])

export const goToRegister = () =>
  setRoot('stack', envConfig.app + '.Register', [
    {
      component: {
        name: envConfig.app + '.Register',
      },
    },
  ])

export const goToStart = () =>
  setRoot('stack', envConfig.app + '.Start', [
    {
      component: {
        name: envConfig.app + '.Start',
      },
    },
  ])

export const goToTutorial = () =>
  setRoot('stack', envConfig.app + '.Tutorial', [
    {
      component: {
        name: envConfig.app + '.Tutorial',
      },
    },
  ])
export const goToWebView = () =>
  setRoot('stack', envConfig.app + '.WebView', [
    {
      component: {
        name: envConfig.app + '.WebView',
      },
    },
  ])


export const goToHome = () =>
  setRoot('bottomTabs', 'bottomtabsId', Menu.nav.bottoms)