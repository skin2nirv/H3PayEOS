import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, ImageBackground, SafeAreaView, Dimensions, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import { isIphoneX } from 'react-native-iphone-x-helper'
var { height, width } = Dimensions.get('window');

type Props = {};
export default class Splash extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      progress : 0,
    }
  }
  
  render() {
    const { progress } = this.props;
    const { containerStyle } = this.props;
    return(
      <ImageBackground 
        source= {require('../images/bg.png')}
        style={containerStyle != null ? containerStyle : styles.container}
        >
        <View style={{width:'100%', height:'100%', alignItems:'center'}}>
          <Image
          source= {require('../images/logo.png')}
          resizeMode='contain' style={{position:'absolute', top: height*0.01*26.33, left:width*0.01*12.5 , width:width*0.01*52.36, height:height*0.01*27.97}}/>
        </View>
        <View style={{ position: 'absolute', left:width*0.01*12.5, bottom: height*0.01*18.83}}>
          <Image
          source= {require('../images/invalidName2x.png')}
          style={{resizeMode:'contain', width:width*0.01*38.89, height:height*0.01*17.89}}/>
        </View>
        <View style={{ position: 'absolute', bottom: 77 }}>
          <Progress.Bar progress={progress} width={width*0.01*76.99} borderRadius={40} height={height*0.01*0.45}
            color={'#e83350'} borderColor={'#e83350'} unfilledColor={'#fff'} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center', width:'100%', height:'100%', resizeMode:'center'
  }
});
