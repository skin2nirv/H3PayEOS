import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Platform, StatusBar} from 'react-native';
import { WebView } from 'react-native-webview';
import { isIphoneX } from 'react-native-iphone-x-helper'
import {InjectedScript} from '../../js/webview/InjectedScript';
import envConfig from '../../env';
import { getStatusBarHeight } from 'react-native-status-bar-height';
type Props = {};
const { width , height } = Dimensions.get('window');
export default class WebViewComponent extends Component<Props> {
  constructor(props){
    super(props);
    this.webview = null;
  }

  componentDidMount(){
    this.webviewScript = new InjectedScript(this.webview);
  }

  componentWillUnmount() {
    this.webviewScript = null;
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={(obj)=> this.webview=obj}
          originWhitelist={['*']}
          userAgent={this.props.userAgent}
          style={[ styles.webviewContainer,
            { marginTop: this.props.url != envConfig.WEBVIEW.url ? Platform.OS == 'ios' ? isIphoneX() ? 30 : 19 : getStatusBarHeight() : 0 }
          ]}
          scrollEnabled={true}
          //scalesPageToFit={true}
          onMessage={this.props._onMessage}
          injectedJavaScript={``}
          injectJavaScript={``}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: this.props.url }}
          onError={this.props._renderError}
          onLoadEnd={this.props._onLoadEnd}
          onLoadStart={this.props._onLoadStart}
          onNavigationStateChange={this.props._onNavigationStateChange}
          useWebKit={true}
          onShouldStartLoadWithRequest={this.props._onShouldStartLoadWithRequest}
          thirdPartyCookiesEnabled={true}
          textZoom={100}
          geolocationEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width : '100%', height : '100%'
  },
  webviewContainer : {
    width: '100%', flex : 1, height : '100%'
  },
});
