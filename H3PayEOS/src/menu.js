
export default Menu = {
}

const statusBarStyle = 'dark';

Menu.name = {
  Intro: {
    title: 'Intro',
    name: 'Intro',
  },
  Tutorial: {
    title: 'Tutorial',
    name: 'Tutorial',
  },
  Login: {
    title: 'Login',
    name: 'Login',
  },
  Home: {
    title: 'Home',
    name: 'Home',
  },
  Setup : {
    title: 'Setup',
    name: 'Setup',
  },
  WebView: {
    title: 'WebView',
    name: 'WebView'
  },
  QR:{
    title: 'QR',
    name: 'QR'
  }
}

Menu.stack = {
  Setup: {
    nav: {
      statusBar: {
        visible: true,
        style: statusBarStyle,
      },
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    }
  },
  Intro: {
    nav: {
      statusBar: {
        visible: true,
        style: statusBarStyle,
      },
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    }
  },
  Tutorial: {
    statusBar: {
      visible: true,
      style: statusBarStyle,
    },
    nav: {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    }
  },
  Login: {
    statusBar: {
      visible: true,
      style: statusBarStyle,
    },
    nav: {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    },
  },
  WebView: {
    nav: {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
      statusBar: {
        visible: false,
        style: 'dark',
        backgroundColor: 'white',
      },
    }
  },
  QR: {
    nav: {
      statusBar: {
        visible: true,
        style: 'light',
        backgroundColor:'blue'
      },
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      }
    }
  },

}
